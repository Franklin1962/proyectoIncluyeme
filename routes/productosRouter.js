
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productosController = require('../controller/productosController');

const imagenesDir = path.join(__dirname, '../publica/imagenes');

// Configuracion del multer para almacenar las imagenes.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagenesDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

//Ruta para la pagina principal 
router.get('/', (req, res) => {
    res.render('home');
});

router.get('/productos', productosController.obtenerProductos);

router.get('/productos/nuevo', productosController.mostrarFormularioNuevoProducto);

router.post('/productos', upload.single('image'), productosController.crearProducto);

router.delete('/productos/:id', productosController.eliminarProducto);

module.exports = router;
