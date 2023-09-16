import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import path from "path"
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import productsRouter from "./routes/products.routes.js";
import ProductManager from "./class/ProductManager.js";
import { productModel } from "./models/products.models.js";


const productMananger = new ProductManager()

const PORT = 8080;
const server = express();


mongoose.connect(process.env.MONGO_URL) 
	.then((async () => {
        console.log("DB is connected")
        const paginationResult = await productModel.paginate({category: category}, { limit: 10, page: 1, sort: {title: 'asc'} })
        console.log(paginationResult)
    }))
	.catch(() => console.log("Error in conexion"))

let productList = [];
const chargeProducts = async () =>  {
    productList = await productMananger.getProducts()
}
chargeProducts();

const serverSocket = server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
});


//Middleware
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', path.resolve(__dirname, './views'))


// Server Socket.io
const io = new Server(serverSocket)

io.on("connection", (socket) => {
    console.log("Socket.io server conected")
    socket.on("messageConnection", (message) => {
        console.log(message)
    })
}) 


// Routes
server.use('/api/products', productsRouter);
server.use('/static', express.static(path.join(__dirname, '/public')), (req, res) => {
    res.render('realTimeProducts', {
        title: Productos, 
        products: productList
    })
});


