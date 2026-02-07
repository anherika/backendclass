import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager('./src/data/products.json');

// 1. LISTAR TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.send({ status: "success", payload: products });
});

// 2. TRAER UN PRODUCTO POR ID
router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await manager.getProductById(pid);
    if (!product) return res.status(404).send({ status: "error", error: "Producto no encontrado" });
    res.send({ status: "success", payload: product });
});

// 3. AGREGAR UN NUEVO PRODUCTO
router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category } = req.body;
    
    // Validación simple de campos obligatorios
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).send({ status: "error", error: "Faltan campos obligatorios" });
    }

    const addedProduct = await manager.addProduct(req.body);
    res.send({ status: "success", payload: addedProduct });
});

// 4. ACTUALIZAR UN PRODUCTO POR ID
router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedProduct = await manager.updateProduct(pid, req.body);
    
    if (!updatedProduct) return res.status(404).send({ status: "error", error: "No se pudo actualizar: Producto no encontrado" });
    
    res.send({ status: "success", payload: updatedProduct });
});

// 5. ELIMINAR UN PRODUCTO POR ID
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    const result = await manager.deleteProduct(pid);
    
    if (!result) return res.status(404).send({ status: "error", error: "No se pudo eliminar: Producto no encontrado" });
    
    res.send({ status: "success", message: "Producto eliminado correctamente" });
});

export default router;