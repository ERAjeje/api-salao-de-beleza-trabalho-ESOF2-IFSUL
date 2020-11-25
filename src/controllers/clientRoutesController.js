import { sign } from '../utils/jwt.js';
import { ClientModel } from '../models/client.model.js';

export const ClientSignup = async (req, res) => {
    try {
        const user = await ClientModel.create(req.body);
        const { id, name, email, createdAt, updatedAt } = user;
        const token = sign({ user: id })
        res.send({ id, name, email, createdAt, updatedAt, token });
    } catch (err) {
        res.status(400).send(err);
    }
}

export const ClientLogin = async (req, res) => {
    const [basic, hash] = req.headers.authorization.split(' ');
    const credentials = Buffer.from(hash, 'base64').toString();
    const [email, password] = credentials.split(':');
    try {
        const user = await ClientModel.findOne({ email, password });

        if(!user){
            res.status(401).send({ error: `User ${email} not found.` });
        }
        const token = sign({ user: user.id });
        res.send({ user, token });
    } catch (err) {
        res.send({ error: err });
    }
}


export const GetLoggedClient = (req, res) => {
    res.send(req.auth);
}
