
import mariadb from 'mariadb'

let conexion = mariadb.createPool({
    host : 'localhost',
    database : 'producto',
    user : 'root',
    password : '123456789',
    port : 3306
})

export default conexion;