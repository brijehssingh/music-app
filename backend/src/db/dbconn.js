import { log } from "console";
import mongoose  from "mongoose";


  export default  async function db() {
    try {
        const conn = await mongoose.connect(process.env.connection_string);
        console.log("connected");  
    } catch (error) {
        console.log("db not connected");
        
    }
}



 