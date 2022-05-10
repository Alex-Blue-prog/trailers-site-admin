import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {login} from "../../redux/apiCall";
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState("teste");
    const [password, setPassword] = useState("teste");
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password});
    }

  return (
    <>
    <div className='aviso'>
      com o usuário <b> teste </b> você pode apenas fazer POST e GET requests
    </div>
    <div className='loginContainer'>
        <input className='loginInput' type="text" placeholder='usuário' onChange={e=>setUsername(e.target.value)} value={username} />
        <input className='loginInput' type="password" placeholder='senha' onChange={e=>setPassword(e.target.value)} value={password} />
        <button style={{cursor: "pointer"}} onClick={handleClick}>Entrar</button>
    </div>
    </>
  )
}

export default Login
