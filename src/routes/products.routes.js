import { Router } from "express";
import ProductManager from "../class/ProductManager.js";

const productsRouter = Router()
const productManager = new ProductManager();


// Ruta para traer todos los productos del límite establecido, sino traer todos los productos
productsRouter.get('/products', async (req, res) => {
    let allProducts = await productManager.getProducts();
    const limit = Number(req.query.limit);
    if(limit){
        const productsLimited = allProducts.slice(0, limit)
        res.status(200).send(productsLimited) 
    }else{
        res.status(200).send("Product request over limit", allProducts)
    }
});


// Ruta para añadir nuevos productos
productsRouter.post('/products', async (req, res) => {
    const { title, description, code, price, stock, category } = req.body;
    const newProduct = await productManager.addProducts(req.body);
    if (newProduct) {
        res.status(200).send("Created product")
    } else {
        res.status(400).send("Product cannot be created because it already exist")
    };
});


// Ruta para traer todos los productos dado un id
productsRouter.get('/products/:pid', async (req, res) => {
    const id = Number(req.params.id)
    let product = await productManager.getProductById(parseInt(id))
    if(product){
        res.status(200).send(prodId)
    }else{
        res.status(400).send("Product doesnt exist")
    };
});


// Ruta para actualizar productos
productsRouter.put ('/products/:pid', async (req, res) => {
    const id = Number(req.params.id)
    let product = await productManager.updateProduct(parseInt(id))
    if(product){
        res.status(200).send("Updated product")
    } else {
        res.status(400).send("Product cannot be updated because it does not exist")
    };
});


// Ruta para eliminar productos
productsRouter.delete ('/products/:pid', async (req, res) => {
    const id = Number(req.params.id)
    let product = await productManager.deleteProduct(parseInt(id))
    if(product){
        res.status(200).send("Removed product")
    } else {
        res.status(400).send("Product cannot be deleted because it does not exist")
    };
});


export default productsRouter;