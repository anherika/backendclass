import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(data);
            }
            return [];
        } catch (error) { return []; }
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            ...product,
            status: true
        };
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return newProduct;
    }
}