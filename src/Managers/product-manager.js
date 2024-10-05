const fs = require("fs").promises;

class ProductManager {
    static ultId = 0;
    constructor(path) {
        this.products = [];
        this.path = path;
        this.cargarArray();
    }

    async cargarArray() {
        try {
            this.products = await this.leerArchivo();
        } catch (error) {
            console.log("Error al inicializar ProductManager", error);
        }
    }

    async addProduct({ title, description, price, code, stock, category, thumbnails = [] }) {
        if (!title || !description || !price || !code || !stock || !category) {
            throw new Error("Todos los campos son obligatorios excepto thumbnails");
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico.. o todos moriremos");
            return;
        }

        const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        const nuevoProducto = {
            id: lastProductId + 1,
            title,
            description,
            price,
            code,
            stock,
            category,
            thumbnails,
            status: true
        };

        this.products.push(nuevoProducto);
        await this.guardarArchivo(this.products);
        return nuevoProducto;
    }

    async getProducts() {
        return await this.leerArchivo();
    }

    async getProductById(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }

    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(item => item.id === id);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado");
        }

        const updatedProduct = {
            ...this.products[productIndex],
            ...updatedFields
        };

        this.products[productIndex] = updatedProduct;
        await this.guardarArchivo(this.products);
        return updatedProduct;
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(item => item.id === id);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado");
        }

        this.products.splice(productIndex, 1);
        await this.guardarArchivo(this.products);
    }

    async leerArchivo() {
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async guardarArchivo(data) {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    }
}

module.exports = ProductManager;
