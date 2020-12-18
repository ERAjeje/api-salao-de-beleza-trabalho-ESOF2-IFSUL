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
    CreateUser,
    GetUserById,
    DeleteUser
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

routes.get('/user/id/:id', autentication, GetUserById)

routes.delete('/user/:id', autentication, DeleteUser)

routes.get('/users', autentication, GetUsers);

routes.post('/users', autentication, CreateUser);

routes.put('/user', autentication, UpdateUser);

routes.get('/me', autentication, GetLoggedUser);

export default routes;