import app from "./src/app.js";
import dotenv from "dotenv";
import db from "./src/db/dbconn.js";
import cors from "cors";

dotenv.config();
app.use(cors({
  origin: "https://your-vercel-app.vercel.app",
  credentials: true
}));
app.get("/", (req, res) => {
  res.send("Music App Backend Running 🚀");
});

app.listen(process.env.PORT || 3000, () => {
  db();
  console.log("server running on port 3000");
});