import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.send({ status: "success", payload: products });
});

router.post('/', async (req, res) => {
    const product = req.body;
    const addedProduct = await manager.addProduct(product);
    res.send({ status: "success", payload: addedProduct });
});

export default router;