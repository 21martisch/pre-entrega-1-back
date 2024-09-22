const express = require("express"); 
const productRoutes = require('./Routes/productos.router.js');
const cartRoutes = require('./Routes/carrito.router.js');
const app = express(); 
const PUERTO = 8080;

//MIDDLEWARE: 
app.use(express.json()); 
//RUTAS:
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`); 
})