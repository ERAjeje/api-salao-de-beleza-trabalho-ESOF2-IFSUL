import express from 'express';
import { UserModel } from '../models/user.model.js';

const routes = express();
routes.use(express.json());

routes.get('/', (req, res) => {
    res.send({message: "rota funcionando", route: req.method})
});

routes.post('/signup', async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
})

export default routes;