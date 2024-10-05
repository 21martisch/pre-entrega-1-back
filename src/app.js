const express = require("express"); 
const exphbs = require("express-handlebars")
const productRoutes = require('./Routes/productos.router.js');
const cartRoutes = require('./Routes/carrito.router.js');
const viewsRouter = require("./Routes/views.router.js");
const socket = require("socket.io");
const app = express(); 
const PUERTO = 8080;

//MIDDLEWARE: 
app.use(express.json());
app.use(express.static("./src/Public"));

//EXPRESS-HANDLERBARS
app.engine("handlebars", exphbs.engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views");

//RUTAS:
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`); 
})

const io = socket(httpServer); 

const ProductManager = require("./Managers/product-manager.js"); 
const manager = new ProductManager("./src/Data/products.json");

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('newProduct', async (data) => {
        try {
            const newProduct = await manager.addProduct(data);
            io.emit('updateProducts', newProduct); 
        } catch (error) {
            console.log('Error al agregar producto', error);
        }
    });

    socket.on('deleteProduct', async (productId) => {
        try {
            await manager.deleteProduct(productId);
            io.emit('removeProduct', productId); 
        } catch (error) {
            console.log('Error al eliminar producto', error);
        }
    });
});