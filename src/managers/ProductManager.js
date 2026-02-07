import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    // LISTAR TODOS
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(data);
            }
            return [];
        } catch (error) { return []; }
    }

    // TRAER UNO SOLO POR ID (Para el GET /:pid)
    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === parseInt(id));
    }

    // AGREGAR PRODUCTO
    async addProduct(product) {
        const products = await this.getProducts();
        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            ...product,
            status: product.status ?? true // Si no viene, es true
        };
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return newProduct;
    }

    // ACTUALIZAR (Para el PUT /:pid)
    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === parseInt(id));

        if (index === -1) return null;

        // IMPORTANTE: Mantenemos el ID original para que no se cambie ni se borre
        const oldId = products[index].id;
        products[index] = { ...products[index], ...updatedFields, id: oldId };

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return products[index];
    }

    // ELIMINAR (Para el DELETE /:pid)
    async deleteProduct(id) {
        const products = await this.getProducts();
        const filteredProducts = products.filter(p => p.id !== parseInt(id));

        if (products.length === filteredProducts.length) return null;

        await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, '\t'));
        return true;
    }
}