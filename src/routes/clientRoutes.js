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
} from '../controllers/clientRoutesController.js';

const clientRoute = express();

clientRoute.use(bodyParser.json());
clientRoute.use(bodyParser.urlencoded({ extended: true }));
clientRoute.use((_, res, next) => {
	//Qual site tem permissão de realizar a conexão
    res.header("Access-Control-Allow-Origin", "localhost");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    clientRoute.use(cors());
    next();
});

clientRoute.get('/clients', autentication, GetClients);

clientRoute.get('/procedures', autentication, GetProceduresByClient);

clientRoute.put('/procedure', autentication, CreateProcedure);

clientRoute.get('/date-availability', autentication, GetDateAvailability);

clientRoute.post('/signup', ClientSignup);


export default clientRoute;