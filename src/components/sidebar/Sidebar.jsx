import "./sidebar.css";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
    AddBox,
    MovieCreation,
  } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {

  const location = useLocation().pathname;

  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">
                    Dashboard
                </h3>    
                <ul className="sidebarList">
                    <Link to="/" className="link">
                        <li className={`sidebarListItem ${location === "/" && "active"}`}>
                            <LineStyle className="sidebarIcon"/>
                            Home
                        </li>   
                    </Link>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">
                    Menu Principal
                </h3>    
                <ul className="sidebarList">

                    <Link to="/animes" className="link">
                        <li className={`sidebarListItem ${location === "/animes" && "active"}`} >
                            <MovieCreation className="sidebarIcon"/>
                            Trailers
                        </li> 
                    </Link>
                    <Link to="/newanime" className="link">
                    <li className={`sidebarListItem ${location === "/newanime" && "active"}`}>
                        <AddBox className="sidebarIcon"/>
                        Criar Trailer
                    </li> 
                    </Link>
                   

                    {/* <Link to="/users" className="link">
                        <li className={`sidebarListItem ${location === "/users" && "active"}`}>
                            <PermIdentity className="sidebarIcon"/>
                            Usuários
                        </li>   
                    </Link> */}

                    <li className="sidebarListItem">
                        <BarChart className="sidebarIcon"/>
                        Reports
                    </li> 
                </ul>
            </div>
      
        </div>
    </div>
  )
}

export default Sidebar