import "./animesEpsList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { deleteAnimeEpisode } from "../../redux/apiCall";
import { publicRequest } from "../../requestMethods";

export default function AnimesEpsList() {
 
  // const animes = useSelector(state => state.anime.animes);
//   const [animesEps, setAnimesEps] = useState([]);
  const locationId = useLocation().pathname.split("/")[3]; 

//   useEffect(()=> {
//     console.log("running");
//     const getAllAnime = async () => {
//       const res = await publicRequest("/anime/" + locationId);

//       setAnimesEps(res.data.episodes);
//     } 

//     getAllAnime();
//   },[])



  const dispatch = useDispatch();

  

//   useEffect(()=> {
//     getAnimes(dispatch);
//   },[dispatch])

  const animesEps = useSelector(state => state.anime.animes.find(anime => {
        if(anime._id === locationId){
            return anime;
        }
    }));




  const handleDelete = (id) => {
      // console.log(id);
    deleteAnimeEpisode(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Nome",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {animesEps?.name}
          </div>
        );
      },
    },
    { field: "ep", 
      headerName: "Número", 
      width: 130 
    },
    {
      field: "action",
      headerName: "Ações",
      width: 280,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/anime/epscreate/" + params.row._id}>
              <button className="productListEdit">Editar Video</button>
            </Link>
        
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {animesEps.episodes.length > 0 && 
        <DataGrid
          rows={animesEps.episodes}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row)=> row._id}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
      />
      }
    </div>
  );
}
