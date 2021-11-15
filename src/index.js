const express = require('express');
const morgan = require('morgan');
const path = require('path');
//incio del servidor
const app= express();
//consfigraciones
app.set('port',process.env.PORT || 3000);
//middlewares
app.use(morgan('dev'));
//variables globales

//
app.use(require('./routes'))
// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});