import { Router } from "express";
import CartManager from "../class/CartManager";


const cartRouter = Router();
const cartManager = new CartManager();


// Ruta para crear un nuevo carrito
cartRouter.post("/cart", async (req, res) => {
    let cart = await cartManager.createCart();
    if(cart)
        res.status(200).send("Cart created")
    else
        res.status(400).semd("Cart cannot be created because it already exist")
});


// Ruta para listar los productos del carrito por id
cartRouter.get("/cart/:cid", async (req, res) => {
    const { products } = req.body
    const idCart = Number(req.params.cid)
    await cartManager.getCartById(idCart);
    if(idCart)
        res.status(200).send(products)
    else
        res.status(400).semd("Error")
});


// Ruta para agregar un carrito al carrito
cartRouter.post("/cart/:cid", async (req, res) => {
    const { products } = req.body
    const idCart = Number(req.params.cid)
    await cartManager.addProductInCartById(idCart);
    res.status(200).send("Product added to cart")
});
