import jwt from 'jsonwebtoken'

export const validarToken = (req,res , next) => {
    // console.log('validando la token...' , validarToken)

    // console.log('aqui viendo' , req.headers['authorization'])

    const headerToken = req.headers["authorization"]
    // console.log('header token' , headerToken)

    if(headerToken !== undefined && headerToken.startsWith('Bearer ')){
        // console.log('si hay token')
        try {
            const BearerToken = headerToken.slice(7)
            // console.log('toker recortado' , BearerToken)

           jwt.verify(BearerToken , process.env.SECRET_KEY || 'gerardo')
     

            next()

        } catch (error) {
            res.status(404).json({msg : 'Token no valido'})
        }
    }else{
        res.status(404).json({msg : 'No hay token Acceso Denegado!'})
    }

}