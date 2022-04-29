import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState, useEffect } from "react";
import {BASE_URL, userRequest} from "../../requestMethods";
;

const FeaturedInfo = () => {

  const [animeTotal, setAnimeTotal] = useState(0);
  const [bestAnime, setBestAnime] = useState(null);
  const [animeView, setAnimeView] = useState([]);
  const [animeViewPerc, setAnimeViewPerc] = useState(0);

 

  useEffect(()=> {
    let check = true;
    let TOKEN = null;

    if(localStorage.getItem("persist:root") && check){
          const user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
          if(user) {
              TOKEN = user.accessToken;
          }
    } 
    let config = {
        headers: { token: `Bearer ${TOKEN}` },
    }

    const getAnimeTotal = async () => {

      const res = await userRequest.get(BASE_URL + "info/animetotal", config);

      if(check) {
        setAnimeTotal(res.data);
      }
      
    }

    const getBestAnime = async () => {
      const res = await userRequest.get(BASE_URL + "info/mostpopular", config);

      if(check) {
        setBestAnime(res.data.name);
      }
    } 

    const getMostView = async () => {
      const res = await userRequest.get(BASE_URL + "info/mostviews", config);

      // console.log(res.data);

      if(check) {
        setAnimeView(res.data);
      }

      if(res.data[1] && check) {
        setAnimeViewPerc(res.data[1].total * 100 / res.data[0].total - 100);
      }
    } 

    getAnimeTotal();
    getBestAnime();
    getMostView();

    return () => {check = false}
  },[])



  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Visualizações</span>
        <div className="featuredMoneyContainer"> 
          <span className="featuredMoney">
          {animeView[0]?._id == new Date().getFullYear() ? animeView[0]?.total : animeView[1]?.total}
          </span>
          <span className="featuredMoneyRate">
            {animeViewPerc.toFixed(0)}% {animeViewPerc < 0 ? <ArrowDownward className="featuredIcon negative"/> : <ArrowUpward className="featuredIcon"/>}
          </span>
        </div>
        <span className="featuredSub">Visualizações de todos trailers criados neste ano comparado com o ano anterior</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total de Trailers</span>
        <div className="featuredMoneyContainer"> 
          <span className="featuredMoney">
            {animeTotal}
          </span>
        </div>
        <span className="featuredSub">Quantidade de Trailers</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Popular</span>
        <div className="featuredMoneyContainer"> 
          <span className="featuredMoney">{bestAnime}</span>
          {/* <span className="featuredMoneyRate">0%<ArrowUpward className="featuredIcon"/> </span> */}
        </div>
        <span className="featuredSub">O Trailer mais popular</span>
      </div>
    </div>
  )
}

export default FeaturedInfo