import express from "express";
import route from "./auth/auth.js";
import cookieParser from "cookie-parser";

const app = express();



app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", route);

export default app;