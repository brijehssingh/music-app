import mongoose from "mongoose";

const songSchema = new mongoose.Schema({

name:{
  type:String,
  required:true
},

url:{
  type:String,
  required:true
},

comment:{
  type:String
},

artist:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"users",
  required:true
}

});

const songModel = mongoose.model("songs", songSchema);

export default songModel;