import {createSlice} from "@reduxjs/toolkit";

export const animeSlice = createSlice({
    name: "anime",
    initialState: {
        animes: [],
        isFetching: false,
        progressBar: 0,
        error: false,
        
    },
    reducers: {
        //VIDEO UPLOAD PROGRESS BAR 
        showProgress: (state, action) => {
            state.progressBar = action.payload;
        },

        //GET ALL ANIMES OR ADD NEW ONE
        getAnimeStart: (state) =>{
            state.isFetching = true;
            state.error = false;
        },
        getAnimeSuccess: (state, action) => {
            state.isFetching = false;
            state.progressBar = 0;
            state.animes = action.payload
            
        },
        getAnimeFailure: (state) => {
            state.error = true;
            state.isFetching = false;
            state.progressBar = 0;
        },

        //DELETE ANIME MAIN INFO
        deleteAnimeSuccess: (state, action) => {
            state.isFetching = false;
            state.animes.splice(
                state.animes.findIndex((item)=> item._id === action.payload), 1
            );
        },

        //DELETE EPISODE
        deleteEpSuccess: (state, action) => {
           
            state.isFetching = false;
            state.animes = state.animes.map(anime => {
                anime.episodes = anime.episodes.filter(ep => {
                    if(ep._id !== action.payload){
                        return true;
                    }

                    return false;

                });

                return anime
            })
        },

        //UPDATE EPISODE
        updateEpSuccess: (state, action) => {
            const {newep} = action.payload;

            state.isFetching = false;
            state.progressBar = 0;
            state.animes = state.animes.map(anime => {
                anime.episodes = anime.episodes.map(ep => {
                    if(ep._id !== action.payload.epId){
                        return ep;
                    } else {
                        return {...ep, ...newep}
                    }

                });

                return anime;
            })
        },

        //UPDATE ANIME MAIN INFO
        updateAnimeSuccess: (state, action) => {
            const {newAnime, id} = action.payload; 
           
            state.isFetching = false;
            state.animes = state.animes.map(anime => {
    
                if(anime._id == id) {
                    return {...anime, ...newAnime};
                }

                return anime;
            })
            
        },
    }
})

export const {
    getAnimeStart, 
    getAnimeSuccess,
    getAnimeFailure, 
    deleteAnimeSuccess,
    updateAnimeSuccess,
    deleteEpSuccess,
    updateEpSuccess,
    showProgress

} = animeSlice.actions;
export default animeSlice.reducer;