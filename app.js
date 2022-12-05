var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'lodging',
    user: 'root',
    password: ''
});
    conexion.connect(function(error){
        if(error){
            throw error;
        }else{
            console.log('CONEXION EXITOSA')
        }
    })
    conexion.end();
    