
import "./addAnimeEps.css";
import {useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { updateAnime } from "../../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import Loading from "../../components/loading/Loading";

export default function AddAnimeEps() {
  const locationTakeId = useLocation().pathname.split("/")[3];
  const [updateNewAnime, setUpdateNewAnime] = useState({name: "", ep: 0, video: ""});
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [epTotal, setEpTotal] = useState(0);
  const isFetching = useSelector(state => state.anime.isFetching)


  console.log();

  const updateAnimeValue = (e) => {

      setUpdateNewAnime(
          {...updateNewAnime, [e.target.name]:e.target.value}
      )
  } 
    
  const hadleClick = (e) => {
    e.preventDefault();

    const data = new FormData();

    if(videoFile) {
      data.append("file", videoFile, videoFile.name);
    } 
    

    const anime = {...updateNewAnime};

    data.append("documents", JSON.stringify(anime));
      
    updateAnime(locationTakeId, data, dispatch, true);

    setUpdateNewAnime(prev => {
      return {...prev, name: "", ep: prev.ep + 1, video: ""}
    })

  }
 
  useEffect(()=> {
    const getAnime = async () => {
      const res = await publicRequest("/anime/" + locationTakeId);

      setEpTotal(res.data.episodes.length + 1);

      const epsTotal = res.data.episodes.length + 1;

       /// error here..
      setUpdateNewAnime({...updateNewAnime, ep: epsTotal});
    } 

    getAnime();
  },[locationTakeId])

  return (
    <div className="product">
         <div className="productTitleContainer">
            <h1 className="productTitle">Novo Video do Trailer</h1>
        </div>
        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">
                
                    <label>Número do Trailer</label>
                    <input type="number" name="ep" value={updateNewAnime.ep} placeholder={epTotal} onChange={updateAnimeValue} />

      
                    <label>Upload Video</label>
                    <input type="file" name="file" onChange={e=>setVideoFile(e.target.files[0])}/>

                    <button style={{marginTop: "5px"}} disabled={isFetching} className="productButton" onClick={(e)=> hadleClick(e)}>Adicionar Trailer</button>

                    <Loading />      
                </div>
                {/* <div className="productFormRight"> */}
                    {/* <div className="productUpload">
                        <label htmlFor="file" style={{cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" ,minWidth: "300px", background: "gray", borderRadius: "5px", color: "#fff"}}>
                            {file?.name ? file.name :`upload da imagem`}<Publish/>
                        </label>
                        <input style={{display: "none"}} onChange={e=>setFile(e.target.files[0])} type="file" id="file" />
                    </div> */}
                    {/* <button disabled={isFetching} className="productButton" onClick={(e)=> hadleClick(e)}>Adicionar Trailer</button> */}
                {/* </div> */}
            </form>
      </div>
    </div>
  );
}