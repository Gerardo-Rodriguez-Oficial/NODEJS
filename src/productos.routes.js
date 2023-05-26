import Router from 'express'
import { deleteProduct, getProduct, getProductos, postProduct, putProduct } from "../controllers/productos.controllers.js";
import { validarToken } from './validarToken.js';
// import Router from 'express'

const route = Router();

route.get("/", validarToken , getProductos)

route.get('/:id', validarToken , getProduct)

route.post('/' , postProduct)

route.put('/:id' , putProduct)

route.delete('/:id' , deleteProduct)

export default route;
