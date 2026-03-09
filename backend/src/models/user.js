

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  user: {
    type: String,
    enum: ["normal","premium"],
    default: "normal"
  }

});

const userModel = mongoose.model("users", userSchema);

export default userModel;