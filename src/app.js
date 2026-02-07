import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = 8080;

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas base
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// El servidor escucha
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});