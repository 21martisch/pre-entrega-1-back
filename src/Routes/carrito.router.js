const express = require('express');
const CartManager = require('../Managers/cart-manager.js');
const cartManager = new CartManager('./src/Data/cart.json');

const router = express.Router();

router.post('/', async (req, res) => {
    const newCart = await cartManager.crearCarrito();
    res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCarritoById(parseInt(req.params.cid));
        res.json(cart.products);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity || 1;
    try {
        const updatedCart = await cartManager.agregarProductoAlCarrito(parseInt(cid), parseInt(pid), quantity);
        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
