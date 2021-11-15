const express = require('express');
const morgan = require('morgan');

//incio del servidor
const app= express();
//consfigraciones
app.set('port',process.env.PORT || 4000);
//middlewares
app.use(morgan('dev'));
//variables globales
// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});