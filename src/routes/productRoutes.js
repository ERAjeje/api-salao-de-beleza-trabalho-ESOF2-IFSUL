import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { autentication, CreateProduct, DeleteProduct, GetProductById, GetProductByName, GetProducts, GetProductsByType, UpdateProduct } from '../controllers/productRoutesController.js';

const productRoute = express();

productRoute.use(bodyParser.json());
productRoute.use(bodyParser.urlencoded({ extended: true }));
productRoute.use(cors({
    "origin": '*',
    "methods": "GET,PUT,POST,DELETE"
}));

productRoute.get('/', autentication, GetProducts);

productRoute.get('/id', autentication, GetProductById);

productRoute.get('/name', autentication, GetProductByName);

productRoute.get('/type', autentication, GetProductsByType);

productRoute.post('/', autentication, CreateProduct);

productRoute.put('/update', autentication, UpdateProduct);

productRoute.delete('/delete', autentication, DeleteProduct);



export default productRoute;