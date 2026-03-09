import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uploadFile from "../srevices/cloudinary.js";
import songModel from "../models/songs.js";

export async function signup(req, res) {

  try {

    const { name, email, password, user } = req.body;

    const find = await userModel.findOne({
      $or: [{ email }, { name }]
    });

    if (find) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hash,
      user
    });

    const token = jwt.sign(
      { user_id: newUser._id, user: newUser.user },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.status(201).json({
      message: "User created",
      user: newUser
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

}


export async function login(req,res){

try {

const {email , password} = req.body;

const user = await userModel.findOne({email});

if(!user){
return res.status(400).json({message:"user not found"});
}

const match = await bcrypt.compare(password,user.password);

if(!match){
return res.status(400).json({message:"password not correct"});
}

const token = jwt.sign(
{ user_id: user._id, user: user.user },
process.env.JWT_SECRET
);

res.cookie("token", token , { httpOnly:true });

res.status(200).json({
message:"Login successful",
user
});

} catch (error) {

res.status(500).json({
message:"server error"
});

}

}


export async function musicUpload(req,res){

const token = req.cookies.token;

if(!token){
return res.status(401).json({message:"unauthorized"});
}

try {

const decode = jwt.verify(token , process.env.JWT_SECRET);

if(decode.user !== "premium"){
return res.status(403).json({message:"you are not premium guy"});
}

const result = await uploadFile(
req.file.buffer.toString("base64")
);

const music = await songModel.create({
name: req.body.name,
url: result.url,
comment: req.body.comment,
artist: decode.user_id
});

return res.status(200).json({
message:"song uploaded",
music
});

} catch (error) {

  console.log("UPLOAD ERROR:", error); 
  return res.status(500).json({
    message: "upload failed",
    error: error.message
  });
}



}


export async function deletemusic(req, res) {

  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "first login" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (decode.user !== "premium") {
      return res.status(403).json({ message: "you are not premium guy" });
    }

    const { id } = req.params;

    const song = await songModel.findById(id);

    if (!song) {
      return res.status(404).json({ message: "song not found" });
    }

    // check song owner
    if (song.artist.toString() !== decode.user_id) {
      return res.status(403).json({ message: "you can delete only your songs" });
    }

    await songModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "song deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "delete failed",
      error: error.message
    });

  }

}

export async function getMySongs(req, res) {

  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "first login" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const songs = await songModel.find({
      artist: decode.user_id
    });

    res.status(200).json({
      songs
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "error fetching songs",
      error: error.message
    });

  }

}
export async function allSong(req, res) {

  try {

    const songs = await songModel.find();

    if (songs.length === 0) {
      return res.status(404).json({
        message: "there is no song"
      });
    }

    res.status(200).json({
      songs
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

}

export async function logout(req, res) {
  try {

    res.clearCookie("token");   // remove token cookie

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message
    });
  }
}

export async function getArtists(req,res){

const artists = await songModel.aggregate([

{
$lookup:{
from:"users",
localField:"artist",
foreignField:"_id",
as:"artist"
}
},

{ $unwind:"$artist" },

{
$group:{
_id:"$artist._id",
artistName:{ $first:"$artist.name" }
}
}

])

res.json({artists})

}

export async function getArtistSongs(req,res){

const {id} = req.params

const songs = await songModel.find({artist:id})

res.json({songs})

}

export async function getCurrentUser(req,res){

try{

const token = req.cookies.token

if(!token){
return res.status(401).json({message:"not logged in"})
}

const decode = jwt.verify(token,process.env.JWT_SECRET)

const user = await userModel.findById(decode.user_id).select("name email")

res.json({user})

}catch(error){

res.status(500).json({message:error.message})

}

}

export async function searchSongs(req,res){

try{

const { id } = req.params
const { query } = req.query

const songs = await songModel.find({

artist: id,

name: { $regex: query, $options: "i" }

})

res.status(200).json({
songs
})

}catch(error){

res.status(500).json({
message:error.message
})

}

}