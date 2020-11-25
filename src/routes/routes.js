import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { autentication } from '../utils/autentication.js';

import { RouterTest, Signup, Login, GetUsers, GetLoggedUser } from '../controllers/routesController.js'
import { UserModel } from '../models/user.model.js';

const routes = express();
routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use((_, res, next) => {
	//Qual site tem permissão de realizar a conexão
    res.header("Access-Control-Allow-Origin", "localhost");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    routes.use(cors());
    next();
});

routes.get('/', RouterTest);

routes.post('/signup', Signup);

routes.get('/login', Login);

routes.get('/users', autentication(req, res, next, UserModel), GetUsers);

routes.get('/me', autentication(req, res, next, UserModel), GetLoggedUser);

export default routes;