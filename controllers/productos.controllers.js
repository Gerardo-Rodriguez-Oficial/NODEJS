import { json } from "express";
import conexion from "../conexion/db.js";

export const getProductos = async (req, res) => {
  const products = await conexion.query("SELECT * FROM productos");

  res.json(products);
};

export const getProduct = async(req, res) => {
  const { id } = req.params;
  // console.log('mi id' , id)

  const product = await conexion.query("SELECT * FROM productos WHERE id = '"+id+"'; ");
  // console.log('productos' , product)

    res.status(200).json(product);
 
};

export const postProduct = async(req, res) => {
  const {nombre , descripcion , precio , stock} = req.body
  let querySQL;

    if(nombre !== undefined && descripcion !== undefined && precio !== undefined && stock !== undefined){
         querySQL = await conexion.query("INSERT INTO productos (nombre , descripcion , precio , stock) VALUES ('"+nombre+"' , '"+descripcion+"' , '"+precio+"' , '"+stock+"')");
         res.status(200).json({msg : "El producto y la imagen se ha guardado con exito!"})
    }else{
        res.status(400).json({
          msg : "Ingresa toda la informacion"
        })
    }
    
    // console.log('respuesta',querySQL)
};

export const putProduct = async(req, res) => {
  // res.send("actualizando datos");
  const {id} = req.params
  const {nombre , descripcion , precio ,stock} = req.body
  let updateProduct;
  console.log('nombre' , nombre)

   if(nombre !== undefined && descripcion !== undefined && precio !== undefined && stock !== undefined){
    updateProduct = await conexion.query("UPDATE productos SET nombre = '"+nombre+"' , descripcion = '"+descripcion+"' , precio = '"+precio+"' , stock = '"+stock+"' WHERE id = '"+id+"' ")
       res.status(200).json({msg : 'El producto se ha actualizado con exito!'})
   }else{
    res.status(400).json({msg : 'Ingresa todos los datos'})
   }
};

export const deleteProduct = async(req, res) => {
  const {id} = req.params

  const deleteProduct = await conexion.query("DELETE FROM productos WHERE id = '"+id+"'; ")
  
  if(deleteProduct.affectedRows > 0){
    res.status(200).json({msg : 'El producto se ha eliminado con exito '})
  }else{
    res.status(400).json({msg : 'El producto no existe'})
  }
  console.log('delete' , deleteProduct.affectedRows)
};
