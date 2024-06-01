const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data', 'productos.json');

const leerProductos = (callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            callback(err);
        } else {
            try {
                const productos = JSON.parse(data);
                callback(null, productos);
            } catch (error) {
                callback(error);
            }
        }
    });
};

const escribirProductos = (productos, callback) => {
    fs.writeFile(filePath, JSON.stringify(productos, null, 2), callback);
};

exports.obtenerProductos = (req, res) => {
    leerProductos((err, productos) => {
        if (err) {
            return res.status(500).send('Error leyendo el archivo de productos.');
        }
        //console.log('productos:', productos);
        res.render('productos', { productos });
    });
};

exports.mostrarFormularioNuevoProducto = (req, res) => {
    res.render('nuevo-producto');
};

exports.crearProducto = (req, res) => {
    leerProductos((err, productos) => {
        if (err) {
            return res.status(500).send('Error leyendo el archivo de productos.');
        }
        
        const nuevoProducto = {
            id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            image: `/imagenes/${req.file.filename}`
        };
        productos.push(nuevoProducto);

        escribirProductos(productos, (err) => {
            if (err) {
                return res.status(500).send('Error guardando el nuevo producto.');
            }
            res.redirect('/productos');
        });
    });
};

exports.eliminarProducto = (req, res) => {
    const productoId = parseInt(req.params.id, 10);
    leerProductos((err, productos) => {
        if (err) {
            return res.status(500).send('Error leyendo el archivo de productos.');
        }
        
        productos = productos.filter(producto => producto.id !== productoId);

        escribirProductos(productos, (err) => {
            if (err) {
                return res.status(500).send('Error guardando los productos actualizados.');
            }
            res.redirect('/productos');
        });
    });
};