import { Link, useLocation} from "react-router-dom";
import "./newAnime.css";
import Chart from "../../components/chart/Chart"
// import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useEffect, useState, useMemo } from "react";
import { addAnime, updateAnime } from "../../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import Loading from "../../components/loading/Loading";
import { getAnimeStart } from "../../redux/animeRedux";


export default function NewAnime() {
    const [updateNewAnime, setUpdateNewAnime] = useState({});
    const dispatch = useDispatch();
    const [cat, setCat] = useState([]);
    const [file, setFile] = useState(null);
    const isFetching = useSelector(state => state.anime.isFetching);
    const [invalid, setInvalid] = useState(false);



    const handleCat = (e) => {
        setCat(e.target.value.split(","));
    }

    const updateAnimeValue = (e) => {
        setUpdateNewAnime(
            {...updateNewAnime, [e.target.name]:e.target.value}
        )
    } 
    
  const hadleClick = (e) => {
    e.preventDefault();

    if(!updateNewAnime?.name) {

      setInvalid(true);
      return;

    } else {
      setInvalid(false);
    }
    
    if(file == null) {
        const anime = {...updateNewAnime, categories: cat};

        console.log(anime);

        addAnime(anime, dispatch);

        return;
    } 

    dispatch(getAnimeStart());// calling before firebase request

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
        //   const products = {...inputs, img: downloadURL, categories: cat, color, size};
        //   addProducts(product, dispatch);

          const anime = {...updateNewAnime, categories: cat, img: downloadURL}

          addAnime(anime, dispatch)
        });
      }
    );

  }

  return (
    <div className="product">
         <div className="productTitleContainer">
            <h1 className="productTitle">Novo Trailer</h1>
        </div>
        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">
                    <label style={{color: invalid ? 'red' : ''}}>Nome do Trailer</label>
                    <input type="text" name="name" placeholder={"Naruto"} onChange={updateAnimeValue} />
                    <label>Descrição</label>
                    <input type="text" name="desc" placeholder={"Descrição"} onChange={updateAnimeValue} />
                
                    <label>Categorias</label>
                    <input type="text" placeholder={"Ação,Aventura,Romance"} onChange={handleCat} />
                 
                    <label>Ano de lançamento</label>
                    <input type="number" name="launch" placeholder={"2022"} onChange={updateAnimeValue} /> 
                    
                    <label>Número da Temporada</label>
                    <input type="number" name="temp" placeholder={"nenhum"} onChange={updateAnimeValue} />
                    
                    <select name="dub" onChange={updateAnimeValue}>
                      <option value={true}>dublado</option>
                      <option value={false}>lengendado</option>
                    </select>

                    
                            
                </div>
                <div className="productFormRight">
                    <div className="productUpload" >
                        <label htmlFor="file" style={{cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" , width: "100%", background: "gray", borderRadius: "5px", color: "#fff"}}>
                          {file?.name ? file.name :`upload da imagem`}<Publish/>
                        </label>
                        <input style={{display: "none"}} onChange={e=>setFile(e.target.files[0])} type="file" id="file" />
                    </div>
                    <button disabled={isFetching} className="productButton" onClick={(e)=> hadleClick(e)}>Criar Trailer</button>
                    <Loading />
                </div>
            </form>
      </div>
    </div>
  );
}