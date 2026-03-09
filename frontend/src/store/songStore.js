import { create } from "zustand";
import API from "../services/api";

export const useSongStore = create((set) => ({

  allSongs: [],
  mySongs: [],
  
  currentSong: null,
  uploadProgress: 0,




artists: [],
artistSongs: [],
user:null,
artistSongs: [],

getArtistSongs: async (id)=>{

const res = await API.get(`/artistSongs/${id}`)

set({artistSongs:res.data.songs})

},

getCurrentUser: async ()=>{

const res = await API.get("/me")

set({user:res.data.user})

},



getArtists: async ()=>{

const res = await API.get("/artists")

set({artists:res.data.artists})

},

getArtistSongs: async(id)=>{

const res = await API.get(`/artistSongs/${id}`)

set({artistSongs:res.data.songs})

},

  // All songs
  getAllSongs: async () => {

    try {

      const res = await API.get("/allsong");

      set({ allSongs: res.data.songs });

    } catch (error) {

      console.log(error);

    }

  },

  // My songs
  getSongs: async () => {

    try {

      const res = await API.get("/getMySongs");

      set({ mySongs: res.data.songs });

    } catch (error) {

      console.log(error);

    }

  },

  // Play song
  playSong: (song) => {

    set({ currentSong: song });

  },

  // Upload song
  uploadSong: async (formData) => {

    try {

      set({ uploadProgress: 1 });

      await API.post("/upload", formData, {

        onUploadProgress: (progressEvent) => {

          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          set({ uploadProgress: percent });

        }

      });

      setTimeout(() => {
        set({ uploadProgress: 0 });
      }, 1000);

    } catch (error) {

      console.log(error);

    }

  },

  // Delete song
  deleteSong: async (id) => {

    try {

      await API.delete(`/deletemusic/${id}`);

      set((state) => ({
        mySongs: state.mySongs.filter(song => song._id !== id)
      }));

    } catch (error) {

      console.log(error);

    }

  }

}));