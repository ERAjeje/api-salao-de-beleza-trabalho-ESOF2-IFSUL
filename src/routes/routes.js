import express from 'express';
import { UserModel } from '../models/user.model.js';

import { sign, verify } from '../utils/jwt.js'

const routes = express();
routes.use(express.json());

const autentication = async (req, res, next) => {
    const [type, token] = req.headers.authorization.split(" ");
    try {
        const payload = verify(token);
        const user = await UserModel.findById(payload.user);
        if(!user){
            res.status(401).send({ error: `User ${email} not found.` });
        }
        req.auth = user;
        next();
    } catch (err) {
        res.send({ error: err });
    }
}

routes.get('/', (req, res) => {
    res.send({message: "rota funcionando", route: req.method})
});

routes.post('/signup', async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        const { id, name, email, createdAt, updatedAt } = user;
        const token = sign({ user: id })
        res.send({ id, name, email, createdAt, updatedAt, token });
    } catch (err) {
        res.status(400).send(err);
    }
});

routes.get('/login', async (req, res) => {
    const [basic, hash] = req.headers.authorization.split(' ');
    const credentials = Buffer.from(hash, 'base64').toString();
    const [email, password] = credentials.split(':');
    try {
        const user = await UserModel.findOne({ email, password });

        if(!user){
            res.status(401).send({ error: `User ${email} not found.` });
        }
        const token = sign({ user: user.id });
        res.send({ user, token });
    } catch (err) {
        res.send({ error: err });
    }
});

routes.get('/users', autentication, async (req, res) => {
    try {
        const users = await UserModel.find();
        res.send(users);
    } catch (err) {
        res.send({ error: err });
    }
});

routes.get('/me', autentication, (req, res) => {
    res.send(req.auth);
})

export default routes;