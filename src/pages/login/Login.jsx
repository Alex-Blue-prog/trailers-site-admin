import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {login} from "../../redux/apiCall";
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password});
    }

  return (
    <div className='loginContainer'>
        <input className='loginInput' type="text" placeholder='usuário' onChange={e=>setUsername(e.target.value)} value={username} />
        <input className='loginInput' type="text" placeholder='senha' onChange={e=>setPassword(e.target.value)} value={password} />
        <button style={{cursor: "pointer"}} onClick={handleClick}>Entrar</button>
    </div>
  )
}

export default Login