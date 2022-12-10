const bcrypt = require('bcrypt');

function login(req, res){
    
    if(req.session.loggedin != true ){
        res.render('login/index');
    } else {
        res.redirect('/')
    }
    
}

function auth(req,res){
    const data= req.body;
    
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM users WHERE Email = ?', [data.Email], (err, usersdata)=>{
            
            if(usersdata.length > 0){

                usersdata.forEach(element => {
                bcrypt.compare(data.password, element.password, (err, isMatch) => {
                        if(!isMatch) {
                            res.render('login/index',{ error: 'ERROR: Contraseña incorrecta'} );
                                    } else {
                                        req.session.loggedin = true;
                                        req.session.Nombre = element.Nombre;

                                        res.redirect('/');
                                    }
                                });
                
                    });
             
            }else{
            res.render('login/index',{ error: 'ERROR: El correo ingresado no existe'} )
        } 
     });
  });         
}

function register(req, res){    
    if(req.session.loggedin != true ){
    res.render('login/register');
} else {
    res.redirect('/')
}

}


function storeUser(req, res){
    const data = req.body;

    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM users WHERE Email = ?', [data.Email], (err, usersdata)=>{
            if(usersdata.length > 0){
                res.render('login/register',{ error: 'ERROR: el correo ingresado ya existe!'} )
            }else{
                bcrypt.hash(data.password, 12).then(hash => {
                    data.password = hash;
            
                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO users SET ?',[data], (err, rows) => {
                            req.session.loggedin = true;
                            req.session.Nombre = data.Nombre;
                            res.redirect('/');
                        });
                    });
                });
            }
        });
    });
}

function logout(req,res){
    if(req.session.loggedin == true){

        req.session.destroy();
    }

        res.redirect('/');
    }


module.exports = {
    login,
    register,
    storeUser,
    auth,
    logout,
}

