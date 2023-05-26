import { Router } from "express";
import { CrearUsers, loginUsers } from "../controllers/usuarios.controllers.js";
const route = Router()

route.post("/" , CrearUsers)

route.post("/login" , loginUsers)


export default route