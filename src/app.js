const express =  require('express');
const {engine} = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const { login } = require('./controllers/logincontroller');

const app = express();
app.set('port', 4000);
app.set('views', path.join(__dirname, './views'));
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'lodging'
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use('/', loginRoutes);

app.listen(app.get('port'), ()=> {
    console.log('Listening on port ', app.get('port'));
});

app.get('/', (req, res) => {
    if(req.session.loggedin == true ){
        res.render('home', {Nombre: req.session.Nombre});
    } else {
        res.redirect('/login')
    }
});


    