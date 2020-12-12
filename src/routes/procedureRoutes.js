import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { 
    CreateProcedure, 
    DeleteProcedure, 
    GetProcedureById, 
    GetProcedureByName, 
    GetProcedures, 
    GetProceduresByType, 
    UpdateProcedure,
    autentication, 
} from '../controllers/procedureRoutesController.js';


const procedureRoute = express();
procedureRoute.use(bodyParser.json());
procedureRoute.use(bodyParser.urlencoded({ extended: true }));
procedureRoute.use(cors({
    "origin": '*',
    "methods": "GET,PUT,POST,DELETE"
}));



procedureRoute.get('/', autentication, GetProcedures);

procedureRoute.get('/id', autentication, GetProcedureById);

procedureRoute.get('/name', autentication, GetProcedureByName);

procedureRoute.get('/type', autentication, GetProceduresByType);

procedureRoute.post('/',  autentication, CreateProcedure);

procedureRoute.put('/update', autentication, UpdateProcedure);

procedureRoute.delete('/delete', autentication, DeleteProcedure);


export default procedureRoute;