
import { ObjectId, UserModel } from '../models/user.model.js';
import { getHeaderAuthorization } from '../utils/authorization.js'

import { sign, verify } from '../utils/jwt.js';

export const autentication = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(400).send({ error: 'Authorization is required to access this route' });
    } else {
        const [type, token] = req.headers.authorization.split(" ");
        try {
            const payload = verify(token);
            const user = await UserModel.findById(payload.user);
            if (!user) {
                res.status(401).send({ error: `User ${email} not found.` });
            }
            req.auth = user;
            next();
        } catch (err) {
            res.send({ error: err });
        }
    }
}

export const RouterTest = (req, res) => {
    res.send({message: "rota funcionando", route: req.method})
}

export const Signup = async (req, res) => {
    let user = req.body;
    user.role = 'funcionario';
    try {
        const data = await UserModel.create(user);
        const { id, name, email, createdAt, updatedAt } = data;
        const token = sign({ user: id })
        res.send({ id, name, email, createdAt, updatedAt, token });
    } catch (err) {
        res.status(400).send(err);
    }
}

export const Login = async (req, res) => {
    const [email, password] = getHeaderAuthorization(req.headers.authorization);
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
}

export const GetUsers = async (_, res) => {
    try {
        const users = await UserModel.find();
        res.send(users);
    } catch (err) {
        res.send({ error: err });
    }
}

export const CreateUser = async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        const { id, name, email, createdAt, updatedAt } = user;
        res.send({ id, name, email, createdAt, updatedAt });
    } catch (err) {
        res.send({ error: err });
    }
}

export const UpdateUser = async (req, res) => {
    const { id } = req.auth;
    const obj = ObjectId(id);
    const body = req.body;
    try {
        let user = await UserModel.findOne({ "_id": obj });
        for(let key in body){
            user[key] = body[key]
        }
        const data = await UserModel.update({ "_id": obj }, user)
        if(data.ok){
            user = await UserModel.findOne({ "_id": obj });
            res.send(user);
        }else{
            throw Error({
                error: data
            })
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const GetLoggedUser = (req, res) => {
    res.send(req.auth);
}
