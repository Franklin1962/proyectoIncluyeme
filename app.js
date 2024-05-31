const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const productosRouter = require('./routes/productosRouter');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'publica')));

app.use('/', productosRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto:${port}`)
});
