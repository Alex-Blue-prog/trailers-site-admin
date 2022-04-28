import { Link, useLocation} from "react-router-dom";
import "./anime.css";
import Chart from "../../components/chart/Chart"
// import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useEffect, useState, useMemo } from "react";
import { userRequest } from "../../requestMethods";
import { updateAnime } from "../../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import Loading from "../../components/loading/Loading";

export default function Anime() {
    const locationTakeId = useLocation().pathname.split("/")[2];
    const [updateNewAnime, setUpdateNewAnime] = useState({});
    const dispatch = useDispatch();
    const anime = useSelector(state => state.anime.animes.find(anime => anime._id == locationTakeId));
    const [cat, setCat] = useState([]);
    const [file, setFile] = useState(null);
    const isFetching = useSelector(state => state.anime.isFetching);
    

    useEffect(() => {
        setCat(anime.categories);
    }, [])

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
    
    if(file == null) {
        const anime = {...updateNewAnime, categories: cat};

        updateAnime(locationTakeId, anime, dispatch);

        return;
    }

    
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

          updateAnime(locationTakeId, anime, dispatch)
        });
      }
    );

  }

    const MONTHS = useMemo(
        () => [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"
        ],
        []
    );

    // useEffect(()=> {
    //     const getStats = async () => {
    //         try{
    //             const res = await userRequest.get("orders/income?pid=" + locationTakeId);

    //             const list = res.data.sort((a,b)=> {
    //                 return a._id - b._id;
    //             })

    //             list.map(item => {
    //                 setPstats((prev)=> [
    //                     ...prev,
    //                     { name: MONTHS[item._id - 1], Vendas: item.total },
    //                 ])
    //             })
    //         } catch(err){
    //             console.log("income error: ", err);
    //         }
    //     }
    //     getStats();
    // }, [])
 
  return (
    <div className="product">
         {/* <div className="productTitleContainer">

            <div>
              <h1 className="productTitle">Anime</h1>
            </div>
            
            <div>
            <Link to="/newanime">
              <button className="productAddButton">Novo</button>
            </Link>
            </div>
        </div> */}
        <div className="productTop">
            {/* <div className="productTopLeft">
                <Chart data={pStats} dataKey="Vendas" title="Desempenho de Vendas"/>
            </div> */}
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img src={anime.img} alt="" className="productInfoImg" />
                    <span className="productName">{anime.name}</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">{anime._id}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">
                    <label>Nome do Trailer</label>
                    <input type="text" name="name" placeholder={anime.name} onChange={updateAnimeValue} />
                    <label>Descrição</label>
                    <input type="text" name="desc" placeholder={anime.desc} onChange={updateAnimeValue} />
                    <label>URL da imagem</label>
                    <input type="text" name="img" placeholder={anime.img} onChange={updateAnimeValue} />
                    <label>Visualizações</label>
                    <input type="number" name="rate" placeholder={anime.rate} onChange={updateAnimeValue} />
                    <label>Categorias</label>
                    <input type="text" placeholder={anime.categories.toString()} onChange={handleCat} />
                   
                    <label>Lançamento</label>
                    <input type="number" name="launch" placeholder={anime.launch} onChange={updateAnimeValue} />

                    <label>Número da Temporada </label>
                    <input type="number" name="temp" placeholder={anime.temp} onChange={updateAnimeValue} />
                     
                    <label>Dublado: {anime.dub ? "sim" : "nao"}</label>
                    <select name="dub" onChange={updateAnimeValue}>
                      <option value={anime.dub}>selecionar</option>
                      <option value={"true"}>Dublado</option>
                      <option value={"false"}>Lengendado</option>
                    </select>
                    <Loading />
                </div>
                <div className="productFormRight">
                    <div className="productUpload">
                        <img src={anime.img} alt="" className="productUploadImg" />
                        <label htmlFor="file" style={{cursor: "pointer"}}>
                            <Publish/>
                        </label>
                        <input onChange={e=>setFile(e.target.files[0])} type="file" id="file" style={{display:"none"}} />
                    </div>
                    <button disabled={isFetching} className="productButton" onClick={(e)=> hadleClick(e)}>Atualizar Trailer</button>
                </div>
            </form>
      </div>
    </div>
  );
}