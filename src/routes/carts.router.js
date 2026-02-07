import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const manager = new CartManager('./src/data/carts.json');

// POST /api/carts/ -> Crea un carrito
router.post('/', async (req, res) => {
    const newCart = await manager.createCart();
    res.send({ status: "success", payload: newCart });
});

// GET /api/carts/:cid -> Lista productos de un carrito
router.get('/:cid', async (req, res) => {
    const cart = await manager.getCartById(req.params.cid);
    if (!cart) return res.status(404).send({ error: "Carrito no encontrado" });
    res.send({ status: "success", payload: cart.products });
});

// POST /api/carts/:cid/product/:pid -> Agrega producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const result = await manager.addProductToCart(cid, pid);
    if (!result) return res.status(404).send({ error: "Error al agregar producto" });
    res.send({ status: "success", payload: result });
});

export default router;