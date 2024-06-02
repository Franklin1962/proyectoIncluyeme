const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const productosRouter = require('./routes/productosRouter');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //Configuracion del motor de plantllas y vistas

app.use(bodyParser.urlencoded({ extended: true })); //Manejar datos del formulario
app.use(methodOverride('_method')); // Maneja las solicitudes DELETE desde un formulario
app.use('/imagenes',express.static(path.join(__dirname, 'publica/imagenes'))); //Manejar los archivos estaticos
app.use('/css',express.static(path.join(__dirname, 'publica/css')))


app.use('/', productosRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto:${port}`)
});
