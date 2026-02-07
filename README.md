# Entrega 1 - API de Gestión de Productos y Carritos

Este es un servidor desarrollado en **Node.js** y **Express** que permite gestionar productos y carritos mediante persistencia en archivos JSON.

## Estructura del Proyecto
- `src/app.js`: Punto de entrada del servidor.
- `src/managers/`: Contiene `ProductManager` y `CartManager` para el manejo de datos.
- `src/routes/`: Definición de los endpoints para `/api/products` y `/api/carts`.
- `src/data/`: Archivos `.json` donde se guarda la información.

## Instrucciones de Instalación
1. Clonar el repositorio.
2. Abrir una terminal en la carpeta raíz.
3. Ejecutar `npm install` para instalar las dependencias.
4. Iniciar el servidor con `npm start` o `node src/app.js`.

## Endpoints Disponibles

### Productos (`/api/products/`)
- **GET `/`**: Lista todos los productos.
- **GET `/:pid`**: Busca un producto por ID.
- **POST `/`**: Agrega un nuevo producto.
- **PUT `/:pid`**: Actualiza un producto por ID.
- **DELETE `/:pid`**: Elimina un producto por ID.

### Carritos (`/api/carts/`)
- **POST `/`**: Crea un nuevo carrito vacío.
- **GET `/:cid`**: Lista los productos de un carrito específico.
- **POST `/:cid/product/:pid`**: Agrega un producto a un carrito (aumenta cantidad si ya existe).

## Tecnologías Utilizadas
- Node.js
- Express
- FileSystem (FS)