
//cosas base para express
const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();

// Ruta al archivo de productos
const filePath = 'products.json';

// Crear una instancia de ProductManager
const productManager = new ProductManager(filePath);

// Middleware para el manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Endpoint para obtener todos los productos
app.get('/products', async (req, res, next) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        next(error);
    }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res, next) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Servidor Express lucas ortiz');
});

// Iniciar el servidor
app.listen(8080, () => {
    console.log('Servidor listo!')
})