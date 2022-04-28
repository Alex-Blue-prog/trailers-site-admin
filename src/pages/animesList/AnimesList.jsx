import "./animesList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAnimes, deleteAnime } from "../../redux/apiCall";
import { publicRequest } from "../../requestMethods";
import Loading from "../../components/loading/Loading";

export default function AnimesList() {
 
  const animes = useSelector(state => state.anime.animes);
  // const [animes, setAnimes] = useState([]);

  // useEffect(()=> {
  //   console.log("running");
  //   const getAllAnime = async () => {
  //     const res = await publicRequest("/anime/all/");

  //     setAnimes(res.data);
  //   } 

  //   getAllAnime();
  // },[])

  const dispatch = useDispatch();

  

  useEffect(()=> {
    getAnimes(dispatch);
  },[dispatch])

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    deleteAnime(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Trailer",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    // { field: "inStock", 
    //   headerName: "Estoque", 
    //   width: 130 
    // },
    // {
    //   field: "price",
    //   headerName: "Preço",
    //   width: 160,
    // },
    {
      field: "action",
      headerName: "Ações",
      width: 380,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/anime/" + params.row._id}>
              <button className="productListEdit">Editar</button>
            </Link>
            <Link to={"/anime/eps/" + params.row._id}>
              <button className="productListEdit ">Videos</button>
            </Link>
            <Link to={"/anime/ep/" + params.row._id}>
              <button className="productListEdit createEp">Adicionar Video</button>
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
      {/* <Loading text={"DELETANDO"} /> */}
      {animes.length > 0 && 
        <DataGrid
          rows={animes}
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
