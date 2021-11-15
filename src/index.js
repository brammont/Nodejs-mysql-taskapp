const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Handlebars = require('express-handlebars');
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