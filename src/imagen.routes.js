import { Router } from "express";
import { postImagen } from "../controllers/imagen.controllers.js";
import upload from "../multer/multer.js";
const route = Router()


route.post('/upload' , upload.single('file') , postImagen)

export default route