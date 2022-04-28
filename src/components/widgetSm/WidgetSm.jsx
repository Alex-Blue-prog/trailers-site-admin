import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

const WidgetSm = () => {
    // const [users, setUsers] = useState([]);

    // useEffect(()=>{
    //     const getUsers = async () => {
    //         try{
    //             const res = await userRequest.get("users/?new=true");
    //             setUsers(res.data);
    //         } catch(err) {

    //         }
           
    //     }
    //     getUsers();    
    // },[])

  return (
    <div className='widgetSm'>
        <span className="widgetSmTitle">Novos Usuários</span>    
        <ul className="widgetSmList">
            {/* {users.map(user => (
                <li className="widgetSmListItem" key={user._id}>
                    <img src={user.img || "https://icon-library.com/images/avatar-icon/avatar-icon-6.jpg"} alt="" className="widgetSmImg"/> 
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">{user.username}</span> 
                    </div>  
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon" /> Display
                    </button> 
                </li>
            ))} */}
            
            
        </ul>
    </div>
  )
}

export default WidgetSm