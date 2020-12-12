import { sign, verify } from '../utils/jwt.js';
import { ClientModel } from '../models/client.model.js';
import { ObjectId } from '../models/user.model.js';

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
    const { id } = req.body;
    try {
        const _id = ObjectId(id);
        let client = await ClientModel.findOne(_id);
        const procedure = {
            "procedureId": req.body.procedureId,
            "userId": req.body.userId,
            "date": req.body.date,
            "hour": req.body.hour
        }
        client.procedures.push(procedure);
        const data = await ClientModel.updateOne({_id: client.id}, client);
        if(data.n){
            res.send(client)
        }else{
            throw Error('Non-updated. Error in process.')
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const GetProceduresByClient = async (req, res) => {
    const { id } = req.body;
    try {
        const _id = ObjectId(id)
        const data = await ClientModel.findOne(_id);
        res.send(data.procedures);
    } catch (err) {
        res.send({ error: err });
    }
}

export const GetDateAvailability = async (req, res) => {
    const { date } = req.body;
    try {
        const availability = await ClientModel.find({ "procedures.date": RegExp(date, "i")}, 'procedures')
        // let dates = availability.map(item => {
        //     return item.procedures
        // }).map(item => item.map(item => item.date));
        res.send(availability)
    } catch (err) {
        res.send({ error: err });
    }
}
