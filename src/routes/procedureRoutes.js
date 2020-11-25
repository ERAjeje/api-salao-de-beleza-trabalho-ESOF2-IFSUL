import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { CreateProcedure, DeleteProcedure, GetProcedureById, GetProcedureByName, GetProcedures, GetProceduresByType, UpdateProcedure } from '../controllers/procedureRoutesController.js';
import { ProcedureModel } from '../models/procedure.model.js';
import { autentication } from '../utils/autentication.js'

const procedureRoute = express();
procedureRoute.use(bodyParser.json());
procedureRoute.use(bodyParser.urlencoded({ extended: true }));
procedureRoute.use((_, res, next) => {
	//Qual site tem permissão de realizar a conexão
    res.header("Access-Control-Allow-Origin", "localhost");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    procedureRoute.use(cors());
    next();
});


procedureRoute.get('/', autentication(req, res, next, ProcedureModel), GetProcedures);

procedureRoute.get('/id', autentication(req, res, next, ProcedureModel), GetProcedureById);

procedureRoute.get('/name', autentication(req, res, next, ProcedureModel), GetProcedureByName);

procedureRoute.get('/type', autentication(req, res, next, ProcedureModel), GetProceduresByType);

procedureRoute.post('/',  autentication(req, res, next, ProcedureModel), CreateProcedure);

procedureRoute.put('/update', autentication(req, res, next, ProcedureModel), UpdateProcedure);

procedureRoute.delete('/delete', autentication(req, res, next, ProcedureModel), DeleteProcedure);


export default procedureRoute;