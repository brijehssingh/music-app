import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";

dotenv.config();

const imagekit = new ImageKit({

privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

});

export default async function uploadFile(file){

const response = await imagekit.files.upload({
file:file,
fileName:"music_"+Date.now(),
folder:"music"
});

return response;

}