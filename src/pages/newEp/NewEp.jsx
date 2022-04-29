import "./newEp.css";
import {useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { updateAnimeEpisode } from "../../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";

//update ep information
export default function AddAnimeEps() {
  const locationTakeId = useLocation().pathname.split("/")[3];
  const [updateNewAnime, setUpdateNewAnime] = useState({name:"", ep: 0, video:""});
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

    updateAnimeEpisode(locationTakeId, data, dispatch);
  

  }

  return (
    <div className="product">
          
         <div className="productTitleContainer">
            <h1 className="productTitle">Editar Informações de Video do Trailer</h1>
        </div>
        <div className="productBottom">
            <form className="productForm">

                <div className="productFormLeft">

                    <label>Número do Trailer</label>
                    <input type="number" name="ep" value={updateNewAnime?.ep ? updateNewAnime?.ep : ""} onChange={updateAnimeValue} />

                    <label>Upload Novo Video</label>
                    <input type="file" name="file" onChange={(e) => setVideoUpload(e.target.files[0])} />

                    <button style={{marginTop: "5px"}} disabled={isFetching} className="productButton" onClick={(e)=> hadleClick(e)}>Atualizar Trailer</button>
                    <Loading />        
                </div>

                <div className="videoContainer">
                  <video width={"100%"} src={updateNewAnime?.video} controls></video>
                </div>
            </form>

      </div>
    </div>
  );
}