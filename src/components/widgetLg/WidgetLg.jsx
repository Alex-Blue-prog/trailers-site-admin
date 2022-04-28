import "./widgetLg.css";
import { useState, useEffect } from "react";
import { userRequest, userRequest2 } from "../../requestMethods";
import {format, register} from "timeago.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {BASE_URL} from "../../requestMethods";

const WidgetLg = () => {
  let {currentUser} = useSelector(state => state.user);

  const localeFunc = (number: number, index: number): [string, string] => {
    return [
      ['agora mesmo', 'agora'],
      ['há %s segundos', 'em %s segundos'],
      ['há um minuto', 'em um minuto'],
      ['há %s minutos', 'em %s minutos'],
      ['há uma hora', 'em uma hora'],
      ['há %s horas', 'em %s horas'],
      ['há um dia', 'em um dia'],
      ['há %s dias', 'em %s dias'],
      ['há uma semana', 'em uma semana'],
      ['há %s semanas', 'em %s semanas'],
      ['há um mês', 'em um mês'],
      ['há %s meses', 'em %s meses'],
      ['há um ano', 'em um ano'],
      ['há %s anos', 'em %s anos'],
    ][index];
  }

  register('pt', localeFunc);

    const [animes, setAnimes] = useState([]);

    useEffect(() => {
      const getNewMostViewAnimes = async () => {

        let TOKEN = null;

        if(localStorage.getItem("persist:root")){
          const user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
          if(user) {
              TOKEN = user.accessToken;
          }
      } 

        let config = {
          headers: { token: `Bearer ${TOKEN}` },
        }

        const res = await axios.get(BASE_URL + "info/newmostviews", config);

  

        setAnimes(res.data);
      }

      getNewMostViewAnimes();
    },[currentUser])


  const Button = ({type}) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }

  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle">Trailers mais Vistos</h3>  
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Nome</th>
            <th className="widgetLgTh">Criado</th>
            <th className="widgetLgTh">Views</th>
            <th className="widgetLgTh">Lançamento</th>
          </tr>
        </thead>  
        <tbody>
          {animes?.map(anime=> (
            <tr className="widgetLgTr" key={anime._id}>
              
              <td className="widgetLgUser">
                <Link to={"/"} className="link">
                  <div className="widgetLgUser">

                    <div className="widgeteLgImgContainer">
                      <img src={anime.img} alt="" className="widgetLgImg" />
                    </div>
                    
                    <span className="widgetLgName">
                      {anime.name}
                      </span>  
                  </div>
                </Link>    
              </td>  
              
              <td className="widgetLgDate">{format(anime.createdAt, 'pt')}</td>
              <td className="widgetLgAmount">{anime.rate}</td>
              <td className="widgetLgStatus"> <Button type={anime.launch} /> </td>
            </tr>
          ))}
          
         
        </tbody>
      </table>
    </div>
  )
}

export default WidgetLg