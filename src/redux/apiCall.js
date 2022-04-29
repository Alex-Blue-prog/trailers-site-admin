import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
    getAnimeStart,
    getAnimeSuccess,
    getAnimeFailure,
    updateAnimeSuccess,
    deleteAnimeSuccess,
    deleteEpSuccess,
    updateEpSuccess,
    showProgress
} from "./animeRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
        // console.log(res.data);
    } catch(err){
        dispatch(loginFailure());
    }
}


//GET ALL ANIMES
export const getAnimes = async (dispatch) => {
    // dispatch(getAnimeStart());
    try{
        const res = await publicRequest.get("/anime/all");
        dispatch(getAnimeSuccess(res.data));
    }catch(err) {
        dispatch(getAnimeFailure());
        console.log("could not get animes");
    }
}


//DELETE AN ANIME
export const deleteAnime = async (id, dispatch) => {
    dispatch(getAnimeStart());
    try{

        dispatch(deleteAnimeSuccess(id)); //deleting from ui
        await userRequest.delete("/anime/"+ id); // deleting from the server
        
    }catch(err) {
        dispatch(getAnimeFailure());
        console.log("could not delete anime main info");
    }
}

//UPDATE AN ANIME OR ADD AN NEW EP
export const updateAnime = async (id, newAnime, dispatch, newEp) => {

    dispatch(getAnimeStart());
    try{
        if(!newEp){
            //update anime main info
            await userRequest.put("/anime/"+ id, newAnime);
            dispatch(updateAnimeSuccess({newAnime, id}));
            return;
        }
        
        //add new episode
        await userRequest.put("/anime/"+ id, newAnime, {
            onUploadProgress: progressEvent => {
                let progress = null;

                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
      
                if (totalLength !== null) {
                    progress = Math.round( (progressEvent.loaded * 100) / totalLength );
                }                

                dispatch(showProgress(progress));
            }
        });
        const getres = await publicRequest.get("/anime/all");
        dispatch(getAnimeSuccess(getres.data));

        // console.log("omg: ", res.data);
        // i think would make more sense this code
        // const getres = await publicRequest.get("/anime/all");
        // dispatch(getAnimeSuccess(getres.data))

        // dispatch(getAnimeSuccess(res.data));

        
    }catch(err) {
        dispatch(getAnimeFailure());
        console.log("could not update anime or add new ep");
    }
}

//ADD AN ANIME
export const addAnime = async (newAnime, dispatch) => {

    dispatch(getAnimeStart());
    try{
        await userRequest.post("/anime/create", newAnime);

        const getres = await publicRequest.get("/anime/all");
        dispatch(getAnimeSuccess(getres.data));

    }catch(err) {
        dispatch(getAnimeFailure());
        console.log("could not add anime");
    }
}

//DELETE AN EPISODE
export const deleteAnimeEpisode = async (epId, dispatch) => {
    dispatch(getAnimeStart());
    try{
        dispatch(deleteEpSuccess(epId)); // deleting from ui
        await userRequest.delete("/anime/ep/" + epId); // deleting from server
    }catch(err){
        dispatch(getAnimeFailure());
        console.log("COULD NOT DELETE ANIME EPISODE");
    }
}

//UPDATE AN EPISODE
export const updateAnimeEpisode = async (epId, episode, dispatch) => {
  
    dispatch(getAnimeStart());
    try{
        const res = await userRequest.put("/anime/ep/" + epId, episode, {
            onUploadProgress: progressEvent => {
                let progress = null;

                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
      
                if (totalLength !== null) {
                    progress = Math.round( (progressEvent.loaded * 100) / totalLength );
                }                

                dispatch(showProgress(progress));

                // const progress = parseInt( Math.round((e.loaded * 100) / e.total) );
            }
        });

        const updatedEp = res.data.episodes.find(value => value._id == epId);
    
        dispatch(updateEpSuccess({epId, newep: updatedEp}));
    }catch(err){
        dispatch(getAnimeFailure());
        console.log("COULD NOT UPDATE ANIME EPISODE");
    }
}