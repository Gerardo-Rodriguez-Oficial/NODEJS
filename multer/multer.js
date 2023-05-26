import multer from 'multer'
import sharp from 'sharp'

const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb( null , "./uploads" )
    },

    filename : (req , file , cb) => {
        const extension = file.originalname.split('.').pop()
        cb(null , ` ${Date.now()}.${extension} `)
    }
})


// esto es un middleware
const upload = multer({storage : storage})



export default upload

