import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { 
    RouterTest, 
    Signup, 
    Login, 
    GetUsers, 
    GetLoggedUser, 
    autentication, 
    UpdateUser,
    CreateUser
} from '../controllers/routesController.js';

const routes = express();
routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(cors({
    "origin": "*",
    "methods": "GET,PUT,POST,DELETE"
}));

routes.get('/', RouterTest);

routes.post('/signup', Signup);

routes.get('/login', Login);

routes.get('/users', autentication, CreateUser);

routes.post('/user', autentication, UpdateUser);

routes.get('/me', autentication, GetLoggedUser);

export default routes;