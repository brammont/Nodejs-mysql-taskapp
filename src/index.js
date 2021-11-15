const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Handlebars = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

//incio del servidor
const app= express();
//consfigraciones
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname ,'views'));
app.engine('handlebars', Handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".handlebars",
    helpers: require('./lib/handlebars')
 }));
 app.set("view engine", "handlebars");
//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//variables globales
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});
//
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/tasks', require('./routes/task'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});