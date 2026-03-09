import express from "express";
import route from "./auth/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "https://your-vercel-app.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", route);

export default app;