import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { 
    ClientSignup, 
    ClientLogin, 
    GetLoggedClient, 
    autentication, 
    GetClients, 
    CreateProcedure, 
    GetProceduresByClient,
    GetDateAvailability,
    GetClientById,
    UpdateClient,
    DeleteClient, 
} from '../controllers/clientRoutesController.js';

const clientRoute = express();

clientRoute.use(bodyParser.json());
clientRoute.use(bodyParser.urlencoded({ extended: true }));
clientRoute.use(cors({
    "origin": '*',
    "methods": "GET,PUT,POST,DELETE"
}));


clientRoute.get('/clients', autentication, GetClients);

clientRoute.put('/', autentication, UpdateClient);

clientRoute.get('/:id', autentication, GetClientById);

clientRoute.delete('/:id', autentication, DeleteClient);

clientRoute.get('/procedures', autentication, GetProceduresByClient);

clientRoute.put('/procedure', autentication, CreateProcedure);

clientRoute.get('/date-availability', autentication, GetDateAvailability);

clientRoute.post('/signup', ClientSignup);


export default clientRoute;