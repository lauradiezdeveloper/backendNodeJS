import { Router} from 'express';
import { productModel } from '../models/products.models.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    const { limit, page, category, sort } = req.query;
    try{
        const result = await productModel.findAll(limit, page, category, sort);
        const responseQuery = {
            status: "success",
            payload: result.docs, 
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `http://${req.headers.host}${req.baseUrl}?limit=${limit}&page=${result.prevPage}&category=${category}&sort=${sort}` : null,
            nextLink: result.hasNextPage ? `http://${req.headers.host}${req.baseUrl}?limit=${limit}&page=${result.nextPage}&category=${category}&sort=${sort}` : null
        };
        res.status(200).send({response: 'OK', message: responseQuery}) 
    }catch(error){
        res.status(400).send({response: 'Error', message: "Product request over limit"})
    }
});


productsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const productById = await productModel.findById(id);
        if(productById){
            res.status(200).send({response: 'OK', message: productById}) 
        }else{
            res.status(400).send({response: 'Error', message: "Product doesnt exist"})}
    }catch{
        res.status(400).send({response: 'Error', message: "Product query error"})
    };
});


productsRouter.post('/', async (req, res) => {
    const { limit } = req.query;
    const { title, description, code, price, stock, category } = req.body;
    try{
        const productCreation = await productModel.create({title, description, code, price, stock, category});
        res.status(200).send({response: 'OK', message: productCreation}) 
    }catch(error){
        res.status(400).send({response: 'Error', message: "Product cannot be created because it already exist"})
    }
});


productsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, code, price, stock, category } = req.body;
    try{
        const productUpdate = await productModel.findByIdAndUpdate(id, [title, description, code, price, stock, category]);
        if(productUpdate){
            res.status(200).send({response: 'OK', message: "Updated product"}) 
        }else{
            res.status(400).send({response: 'Error', message: "Product cannot be updated because it does not exist"})}
    }catch{
        res.status(400).send({response: 'Error', message: "Product query error"})
    };
});


productsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
        try{
        const productDelete = await productModel.findByIdAndDelete(id);
        if(productDelete){
            res.status(200).send({response: 'OK', message: "Removed product"}) 
        }else{
            res.status(400).send({response: 'Error', message: "Product cannot be deleted because it does not exist"})}
    }catch{
        res.status(400).send({response: 'Error', message: "Product query error"})
    };
});



export default productsRouter;