import { Router } from "express";
import { cartModel } from "../models/carts.models";
import { productModel } from "../models/products.models";

const cartRouter = Router()

cartRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const cartById = await cartModel.findById(id);
        if(cartById){
            res.status(200).send({response: 'OK', message: cartById}) 
        }else{
            res.status(400).send({response: 'Error', message: "Cart doesnt exist"})}
    }catch{
        res.status(400).send({response: 'Error', message: "Cart query error"})
    };
});


cartRouter.post('/:', async (req, res) => {
    try{
        const productCreation = await cartModel.create();
        res.status(200).send({response: 'OK', message: productCreation}) 
    }catch(error){
        res.status(400).send({response: 'Error', message: "Error creating cart"})
    }
});


cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid , pid } = req.body
    const { quantity } = req.body

    try{
        const cartExist = await cartModel.findById(cid)
            if(cartExist){
                const productExist = await productModel.findById(pid)
                if(productExist){
                    const index= cartExist.productExist.findIndex(prod => prod.id_prod === pid)
                    if(index != -1){
                        cartExist.productExist[index].quantity = quantity
                    }else{
                        cartExist.productExist.push({id_prod: pid, quantity: quantity})
                    }
                }else{ 
                    res.status(404).send({response: 'Error', message: "Product not found"})
                }
            }else{
                res.status(404).send({response: 'Error', message: "Cart doesnt exist"})
            }
        
    }catch(error){
        res.status(400).send({response: 'Error', message: "Error adding product to cart"})

    }
});


cartRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await productModel.cleanCart(id);
        res.status(200).send({response: 'OK', message: 'Cart empty'});
    } catch (error){
        res.status(400).send({response: 'Error getting cart by id', message: error})
    }
})

cartRouter.put('/:cid/products/:pid', async (req, res) =>{
    const { cid, pid } = req.params
    const { quantity } = req.body
    
    try {
        await productModel.addOrUpdateProductInCart(cid, pid, quantity);
        res.status(200).send({response: 'OK', message: 'Cart Updated' });
    } catch (error) {
        res.status(error.message.includes("Product not found") ? 404 : 400).send({response: 'Error', message: error.message});
    }
})

cartRouter.delete('/:cid/products/:pid', async (req, res) =>{
    const {cid, pid} = req.params
    
    try {
        await productModel.removeProductbyId(cid, pid);
        res.status(200).send({response: 'OK', message: 'Product removed'});
    } catch (error) {
        res.status(error.message.includes("Cart not found") ? 404 : 400).send({response: 'Error', message: error.message});
    }
})

cartRouter.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const productsArray = req.body.products;

    if (!Array.isArray(productsArray)) {
        return res.status(400).send({response: 'Error', message: 'Products should be in an array'});
    }

    try {
        await productModel.updateCartWithProducts(cid, productsArray);
        res.status(200).send({response: 'OK', message: 'Cart updated successfully'});
    } catch (error) {
        res.status(error.message.includes("Cart not found") ? 404 : 400).send({response: 'Error', message: error.message});
    }
})

export default cartRouter