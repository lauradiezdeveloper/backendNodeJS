import {promises as fs} from "fs";
import Product from "./Product.js";
const path = "./src/models/products.json";

export default class ProductManager {
    constructor() {
        this.products = []
    };


    async addProduct (product){ 
        const products = JSON.parse(await fs.readFile(path, "utf-8"));
        const findProduct = products.find(findProduct => findProduct.code === product.code);
        if(findProduct){
            console.log("Product already exists:", product.title);
        }else{
            products.push(product);
            await fs.writeFile(path, JSON.stringify(products))
        };
    };


    async getProducts (){
        const products = JSON.parse(await fs.readFile(path, "utf-8"));
        console.log(products);
    };


    async getProductById (id) {
        const products = JSON.parse(await fs.readFile(path, "utf-8"));
        const findProduct = products.find(findProduct => findProduct.id === id);
        if(findProduct){
            console.log("Product found");
        }else{
            console.log("Product not found");
        };
    };


    async updateProduct (id, product) {
        const products = JSON.parse(await fs.readFile(path, "utf-8"))
        const index = products.findIndex(prod => prod.id === id)
    
        if(index != -1) {
            products[index].name = product.name
            products[index].id = product.id
            await fs.writeFile(path, JSON.stringify(products))
            console.log("Product updated");
        } else {
            console.log("Product not found");
        };
    };


    async deleteProduct (id) {
        const products = JSON.parse(await fs.readFile(path, "utf-8"))
        const productId = products.find(prod => prod.id === id)
    
        if(products) {
            await fs.writeFile(path, JSON.stringify(products.filter(product => product.id != id)))
            console.log("Product deleted")
        } else {
            console.log("Product not found");
        };
    };
};