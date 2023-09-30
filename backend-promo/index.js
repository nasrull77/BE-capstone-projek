import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import nodemon from "nodemon";
import PromoRoute from "./routers/PromoRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(PromoRoute);

app.listen(5000, () => console, console.log("server Up and Runing..."));
