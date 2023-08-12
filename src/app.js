import {promises as fs} from "fs";
import express from "express";
import ProductManager from "./class/ProductManager";

const path = "./products.json";

const productManager = new ProductManager();

// productManager.addProduct(prod1);
// productManager.deleteProduct(2);


const PORT = 4000;

const server = express();

server.get('/products', (req, res) => {
    const { limit } = req.query
    if(limit){
        const productsLimited = path.slice(0, limit)
        res.send(fs.readFile(path, "utf-8"))
    }
});


server.get('/products/:id', (req, res) => {
    const prodId = products.find(prodID => prodID.id === parseInt(req.params.id))
    if(prodId){
        res.send(prodId)
    }else{
        res.send("Product doesnt exist")
    };
});