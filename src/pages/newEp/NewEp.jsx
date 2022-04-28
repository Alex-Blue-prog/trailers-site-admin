import "./newEp.css";
import {useLocation} from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { updateAnimeEpisode } from "../../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import Loading from "../../components/loading/Loading";

//update ep information
export default function AddAnimeEps() {
  const locationTakeId = useLocation().pathname.split("/")[3];
  const [updateNewAnime, setUpdateNewAnime] = useState({name:"", ep: 0, img:"", video:"", key: ""});
  const [videoUpload, setVideoUpload] = useState(null);
  const isFetching = useSelector(state => state.anime.isFetching);  
  let getAnime = useSelector(state => state.anime.animes);
 
  
  useEffect(()=> {    
    let getEp;
  
    getAnime = getAnime.forEach(anime => {

        return anime.episodes.forEach(ep => {
      
          if(ep._id === locationTakeId){
              getEp = ep;
          } 
        });
        
    })


    // getEp = getEp.episodes.find(ep => ep._id === locationTakeId);
 
    setUpdateNewAnime(getEp);
    
  },[locationTakeId, getAnime]); //getAnime


  const dispatch = useDispatch();
  const [file, setFile] = useState(null);


  const updateAnimeValue = (e) => {

      setUpdateNewAnime(
          {...updateNewAnime, [e.target.name]:e.target.value}
      )
  } 
    
  const hadleClick = (e) => {
    e.preventDefault();

    const data = new FormData();

    if(videoUpload) {
      data.append('file', videoUpload, videoUpload.name);
    }

    const episode = {...updateNewAnime};

    data.append('documents', JSON.stringify(episode));

    if(file == null) {

        updateAnimeEpisode(locationTakeId, data, dispatch);
    
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

          const episodeAndImg = {...updateNewAnime, img: downloadURL};

          data.append('documents', JSON.stringify(episodeAndImg));

          updateAnimeEpisode(locationTakeId, data, dispatch);

    
        });
      }
    );

  }

  return (
    <div className="product">
          
         <div className="productTitleContainer">
            <h1 className="productTitle">Editar Informações de Video do Trailer</h1>
        </div>
        <div className="productBottom">
            <form className="productForm">

                <div className="productFormLeft">
                    <label>URL da Imagem Atual</label>
                    <input type="text" name="img" value={updateNewAnime?.img ? updateNewAnime?.img : ""} placeholder={"https://..."} onChange={updateAnimeValue} />

                    <label>Número do Trailer</label>
                    <input type="number" name="ep" value={updateNewAnime?.ep ? updateNewAnime?.ep : ""} onChange={updateAnimeValue} />

                    {/* <label>URL do Video</label>
                    <input type="text" name="video" value={updateNewAnime?.video ? updateNewAnime.video : ""} placeholder={"https://..."} onChange={updateAnimeValue} />

                    <label>KEY do Video</label>
                    <input type="text" name="key" value={updateNewAnime?.key || ""} placeholder={"Key"} onChange={updateAnimeValue} /> */}

                    <label>Upload Novo Video</label>
                    <input type="file" name="file" onChange={(e) => setVideoUpload(e.target.files[0])} />

                    <Loading />

                            
                </div>
                <div className="productFormRight">
                    <div className="productUpload">
                        <label htmlFor="file" style={{cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" ,minWidth: "300px", background: "gray", borderRadius: "5px", color: "#fff"}}>
                            {file?.name ? file.name :`upload da imagem`}<Publish/>
                        </label>
                        <input style={{display: "none"}} onChange={e=>setFile(e.target.files[0])} type="file" id="file" />
                    </div>
                    <button disabled={isFetching} className="productButton" onClick={(e)=> hadleClick(e)}>Atualizar Trailer</button>
                </div>
            </form>
      </div>
    </div>
  );
}