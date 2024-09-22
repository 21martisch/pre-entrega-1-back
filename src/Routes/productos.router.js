const express = require('express');
const ProductManager = require('../Managers/product-manager.js');
const productManager = new ProductManager('./src/Data/productos.json');

const router = express.Router();

router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    res.json(limit ? products.slice(0, limit) : products);
});

router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params.pid));
    product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
    const newProduct = req.body;
    await productManager.addProduct(newProduct);
    res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
    const updatedProduct = req.body;
    await productManager.updateProduct(parseInt(req.params.pid), updatedProduct);
    res.json(updatedProduct);
});

router.delete('/:pid', async (req, res) => {
    await productManager.deleteProduct(parseInt(req.params.pid));
    res.status(204).end();
});

module.exports = router;
