import {allSong, deletemusic, getArtists, getArtistSongs, getCurrentUser, getMySongs, login, logout, musicUpload, searchSongs, signup} from "../controllers/controller.js"

   import { Router } from "express"
    import multer from "multer"
    const upload = multer({
      storage:multer.memoryStorage()
    })
   const route = Router();
    
    
route.post("/signup" , signup);
route.post("/login" ,login);
route.get("/logout" , logout);
route.post("/upload" , upload.single("music"), musicUpload)
route.get("/allsong", allSong);
route.get("/getMySongs", getMySongs);
route.delete("/deletemusic/:id" , deletemusic);
route.get("/artists", getArtists)
route.get("/artistSongs/:id", getArtistSongs)
route.get("/me", getCurrentUser)
route.get("/searchSongs/:id", searchSongs)
export default route