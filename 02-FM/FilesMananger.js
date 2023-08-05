import {promises as fs} from "fs";

const path = "./products.json";

const getProduct = async () => {
    const products = JSON.parse(await fs.readFile(path, "utf-8"))
    console.log(products)
};


const getProductById = async (id) => {
    const products = JSON.parse(await fs.readFile(path, "utf-8"))
    const productId = products.find(prod => prod.id === id)
    
    if(productId) {
        console.log(productId);
    } else {
        console.log("Product not found");
    };
};


const addProduct = async (product) => {
    const products = JSON.parse(await fs.readFile(path, "utf-8"))
    const productId = products.find(prod => prod.id === id)

    if(product) {
        console.log("Product already added");
    } else {
        product.push(products)
        await fs.writeFile(path, JSON.stringify(products))
    };
};


const updateProduct = async(id, product) => {
    const products = JSON.parse(await fs.readFile(path, "utf-8"))
    const index = products.findIndex(prod => prod.id === id)

    if(index != -1) {
        products[index].name = product.name
        products[index].id = product.id
        await fs.writeFile(path, JSON.stringify(products))
    } else {
        console.log("Product not found");
    };
};


const deleteProduct = async(id) => {
    const products = JSON.parse(await fs.readFile(path, "utf-8"))
    const productId = products.find(prod => prod.id === id)

    if(product) {
        await fs.writeFile(path, JSON.stringify(products.fiñter(product => product.id != id)))
    } else {
        console.log("Product not found");
    };
};



// getProduct();
// getProductById(1);
// getProductById(5);
// const producto2= {nombre: "adidas", id: 2};
// addProduct(producto2);
// updateProduct(1, {nombre: "Converse"})
// deleteProduct(1)