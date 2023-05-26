import conexion from "../conexion/db.js";
import bcript from 'bcrypt'
import jwt from 'jsonwebtoken'

export const CrearUsers = async(req,res) => {
    const {username , pasword} = req.body
    let postUsers;

    // verificar que el usuario no exista
    const verificarUsers = await conexion.query("SELECT id , username , pasword FROM usuarios AS usuario WHERE usuario.username = '"+username+"'; ")

    // console.log('veri',verificarUsers)

    if(verificarUsers.length > 0 || verificarUsers.username === username){
        res.json({msg : 'El usuario ya existe'})
        return
    }

    // console.log('sigo')
    if(username !== undefined && pasword !== undefined){
    //    console.log('no encriptada' , pasword)
        const encriptedPasword = await bcript.hash(pasword , 10)
        // console.log('si encriptada' , encriptedPasword)
        postUsers = await conexion.query("INSERT INTO usuarios (username , pasword) VALUES ('"+username+"' , '"+encriptedPasword+"'); ")

        res.status(200).json({msg : "El usuario se registro con exito! "})
        // console.log('users' , postUsers)
    }else{
        res.status(400).json({msg : "Por favor ingresa los datos"})
    }

}

export const loginUsers = async(req,res) => {
    // res.json({msg : 'Bienvenido'})
    const {username , pasword} = req.body

    const verificarUsers = await conexion.query("SELECT id , username , pasword FROM usuarios AS usuario WHERE usuario.username = '"+username+"' ")

    // console.log('verify' , verificarUsers)

    // verificar que exista el usuario
    if(verificarUsers.length === 0){
        res.json({msg : 'El usuario no existe'})
        return
    }

    // verificar que la contraseña sea correcta
    const verificarPasword = await bcript.compare(pasword , verificarUsers[0].pasword)

    // console.log('very pasword' , verificarPasword)

    if(!verificarPasword){
        res.json({msg : 'La contraseña es incorrecta'})
        return
    }

    // CREAR TOKEN AL USUARIO
   const token = jwt.sign({
        username : username,
        hoobby : "Jugar futbol"
   },
     process.env.SECRET_KEY || 'gerardo'
   )

    //res.json({msg : `Bienvendio ${username} este es tu token ${token} `})
    res.json(token)

}