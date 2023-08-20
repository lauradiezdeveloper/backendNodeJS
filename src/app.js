import express from "express";
import path from "path";
import { __dirname } from "./path";
import productsRouter from "./routes/products.routes";


const PORT = 8080;
const server = express();

server.use('/api/products', productsRouter);
server.use('/static', express.static(path.join(__dirname, '/public')));

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
});