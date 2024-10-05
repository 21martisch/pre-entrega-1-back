const express = require("express"); 
const router = express.Router(); 
const ProductManager = require('../Managers/product-manager'); 
const productManager = new ProductManager('./src/Data/products.json');

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("home", { products });
    } catch (error) {
        console.log("Error al obtener productos", error);
        res.status(500).send("Error interno del servidor");
    }
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("realtimeproducts", { products }); 
    } catch (error) {
        console.log("Error al obtener productos", error);
        res.status(500).send("Error interno del servidor");
    }
});

module.exports = router;
