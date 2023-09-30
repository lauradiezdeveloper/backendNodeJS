import {promises as fs} from "fs";

const path = "./src/models/cart.json";

export default class CartManager {
    constructor() {
        this.products = []
        this.id = Cart.increaseId()
    };

    static increaseId() {
        if(this.idIncrement) {
            this.idIncrement++
        }else{
            this.idIncrement = 1
        }
        return this.idIncrement
    };

    async createCart() {
        const cart = JSON.parse(await fs.readFile(path, "utf-8"));
        const newCart = new Cart();
        if(newCart != cart){
            newCart(push)
            console.log("Cart created successfully")
        }else{
            console.log("Cart already exist")
        }
    };

    async getCartById(id, products) {
        const cart = JSON.parse(await fs.readFile(path, "utf-8"));
        const cartId = cart.find(cartId => cartId === cart.id)
        if(cartId){
            console.log(cartId.products)
            //TODO falta añadir cantidad de los productos añadidos
        }else{
            console.log("Cart doesnt exist")
        }
    };

    async addProductInCartById(id, products){
        const cart = JSON.parse(await fs.readFile(path, "utf-8"));
        const productInCart = cart.find(productInCart => productInCart != cart.products)
        productInCart.productos.push();
        await fs.writeFile(path, JSON.stringify(products))
    };
};