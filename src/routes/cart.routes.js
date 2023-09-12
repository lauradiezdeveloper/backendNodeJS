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

export default cartRouter