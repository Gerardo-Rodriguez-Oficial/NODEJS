import express from "express";
import env from "dotenv";
import cors from 'cors'
import routesProductos from "./src/productos.routes.js";
import routeUsers from "./src/usuarios.routes.js";
import conexion from "./conexion/db.js";
import routeImage from "./src/imagen.routes.js";

env.config();

// SERVIDOR
const app = express();

//midledware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended : false }))

// RUTAS
app.use("/productos", routesProductos);
app.use("/usuarios" , routeUsers)
app.use('/imagen' , routeImage)

// conexion bd
const connect = async() => {
  try {
    await conexion.getConnection();
    console.log("conectado a la base de datos...");
  } catch (error) {
    console.log(error)
  }
};

connect();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
