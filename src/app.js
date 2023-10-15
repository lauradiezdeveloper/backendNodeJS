import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import path from "path"
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import productsRouter from "./routes/products.routes.js";
import userRouter from './routes/users.routes.js';
import cartRouter from "./routes/cart.routes.js";
import sessionsRouter from './routes/sessions.routes.js';
// import ProductManager from './class/ProductManager.js';
import { productModel } from "./models/products.models.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';


// const productMananger = new ProductManager()

const PORT = 4000
const server = express();

server.get('/', (req, res) => {
    res.send('¡Bienvenido a la página de inicio de la aplicación!');
});


// Conexión base de datos
mongoose.connect(process.env.MONGO_URL) 
	.then((async () => {
        console.log("DB is connected")
        const resultado = await productModel.paginate()
				console.log(resultado)
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
server.use(cookieParser(process.env.SIGNED_COOKIE))
server.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        },
    ttl: 60
    }),
    secret: process.env.SESSIOM_SECRET,
    resave: false,
    saveUninitialized: false
}))

// Vistas
server.engine('handlebars', engine({ extname: '.handlebars' }))
server.set('view engine', 'handlebars')
server.set('views', path.resolve(__dirname, './views'))
server.get('/register', (req, res) => {
    res.render('register'); 
});
server.get('/login', (req, res) => {
    res.render('login'); 
});
server.get('/products', (req, res) => {
    res.render('products'); 
});

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
server.use('/api/users', userRouter);
server.use('/api/cart', cartRouter);
server.use('/api/sessions', sessionsRouter);

server.use('/static', express.static(path.join(__dirname, '/public')), (req, res) => {
    res.render('realTimeProducts', {
        title: Productos, 
        products: productList
    })
});
