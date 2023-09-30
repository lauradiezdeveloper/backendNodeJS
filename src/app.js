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
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import Handlebars from 'handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
//import MongoStore from 'connect-mongo';


const productMananger = new ProductManager()

const PORT = 4000
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
console.log("lee hasta middleware")
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser(process.env.SIGNED_COOKIE))
server.use(session({
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }, 
        ttl: 120
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
})) 

console.log("lee hasta handlebars")
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: Handlebars, 
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
});

console.log("lee hasta rutas")
server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', path.resolve(__dirname, './views'))
server.use('/home', express.static(path.join(__dirname, '/public'))) 
server.use('/realtimeproducts', express.static(path.join(__dirname, '/public')))
server.use('/login', express.static(path.join(__dirname, '/public')))
server.use('/logout', express.static(path.join(__dirname, '/public')))
server.use('/signup', express.static(path.join(__dirname, '/public')))
server.use('/chat', express.static(path.join(__dirname, '/public')))
server.use('/cart', express.static(path.join(__dirname, '/public')))

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
