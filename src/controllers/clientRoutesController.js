import { sign, verify } from '../utils/jwt.js';
import { ClientModel } from '../models/client.model.js';
import { ProceduresModel } from '../models/procedures.model.js';

export const autentication = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(400).send({ error: 'Authorization is required to access this route' });
    } else {
        const [type, token] = req.headers.authorization.split(" ");
        try {
            const payload = verify(token);
            const user = await ClientModel.findById(payload.user);
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

export const GetClients = async (_, res) => {
    try {
        const clients = await ClientModel.find();
        res.send(clients);
    } catch (err) {
        res.send({ error: err });
    }
}

export const CreateProcedure = async (req, res) => {
    const { procedureId, userId, date, hour, clientId } = req.body;
    try {
        const data = await ProceduresModel.create({ procedureId, userId, date, hour, clientId });
        res.send(data)
    } catch (err) {
        res.send({ error: err });
    }
}

export const GetProceduresByClient = async (req, res) => {
    const { clientId } = req.body;
    try {
        const data = await ProceduresModel.find({ clientId });
        res.send(data);
    } catch (err) {
        res.send({ error: err });
    }
}

export const GetDateAvailability = async (req, res) => {
    const { month } = req.body;
    try {
        const availability = await ProceduresModel.find({ "date": RegExp(month)})
        res.send(availability)
    } catch (err) {
        res.send({ error: err });
    }
}
