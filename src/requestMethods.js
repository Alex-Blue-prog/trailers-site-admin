import axios from "axios";
import { useEffect } from "react";

export const BASE_URL = "http://localhost:5000/api/";
// export const BASE_URL = "https://animes-on.herokuapp.com/api/";


let TOKEN = null;


if(localStorage.getItem("persist:root")){
        const user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
        if(user) {
            TOKEN = user.accessToken;
        }
} 


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});
