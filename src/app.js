import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import path from "path"
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import productsRouter from "./routes/products.routes.js";
import ProductManager from './class/ProductManager.js';
import { productModel } from "./models/products.models.js";


// const productMananger = new ProductManager()

const PORT = 4000
const server = express();

server.get('/', (req, res) => {
    res.send('¡Bienvenido a la página de inicio de la aplicación!');
});

mongoose.connect(process.env.MONGO_URL) 
	.then((async () => {
        console.log("DB is connected")
    }))
	.catch((error) => console.log(error))

/* let productList = [];
const chargeProducts = async () =>  {
    productList = await productMananger.getProducts()
}
chargeProducts(); */

const serverSocket = server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
});


//Middleware
console.log("lee hasta middleware")
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', path.resolve(__dirname, './views'))


console.log("lee hasta socket.io")
// Server Socket.io
const io = new Server(serverSocket)

io.on("connection", (socket) => {
    console.log("Socket.io server conected")
    socket.on("messageConnection", (message) => {
        console.log(message)
    })
}) 

console.log("lee hasta rutas 2")
// Routes
server.use('/api/products', productsRouter);
server.use('/static', express.static(path.join(__dirname, '/public')), (req, res) => {
    res.render('realTimeProducts', {
        title: Productos, 
        products: productList
    })
});
