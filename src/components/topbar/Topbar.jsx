import React from 'react';
import "./topbar.css";
import { NotificationsNone, Language, Settings, Menu } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userRedux';

const Topbar = ({setOpenSideBar}) => {

  const dispatch = useDispatch();

  const out = () => {
    dispatch(logout());
  }

 

  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className="topLeft">
                <span className='logo'>Painel de admin</span>  
                <div className='mobileMenuIcon' onClick={setOpenSideBar}>
                    <Menu />
                </div>
            </div>  
            <div className="topRight">
           
                    <button className="logout" onClick={out}>Sair</button>
               
                {/* <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className='topIconBadge'>2</span>
                </div>  
                <div className="topbarIconContainer">
                    <Language />
                    <span className='topIconBadge'>2</span>
                </div>  */}
                {/* <div className="topbarIconContainer">
                    <Settings />
                </div> 
                <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-9.jpg" alt="avatar icon" className='topAvatar'/> */}
            </div>  
        </div>  
    </div>
  )
}

export default Topbar