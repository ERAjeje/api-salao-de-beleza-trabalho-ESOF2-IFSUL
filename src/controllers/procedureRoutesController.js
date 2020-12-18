import { verify } from '../utils/jwt.js';
import { ClientModel } from '../models/client.model.js';
import { ObjectId, ProcedureModel } from '../models/procedure.model.js';
import { UserModel } from '../models/user.model.js';

export const autentication = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(400).send({ error: 'Authorization is required to access this route' });
    } else {
        const [type, token] = req.headers.authorization.split(" ");
        try {
            const payload = verify(token);
            const user = await UserModel.findById(payload.user);
            if (user === null) {
                let client = await ClientModel.findById(payload.client);
                if (!client) {
                    res.status(401).send({ error: `User ${email} not found.` });
                } else {
                    client.procedures = []
                    req.auth = client;
                    req.auth.category = 1;
                    next();
                }
            } else {
                req.auth = user;
                req.auth.category = 1;
                next();
            }
        } catch (err) {
            res.send({ error: err });
        }
    }
}


const userAuthorization = async (_id) => {
    const user = await UserModel.findOne(_id)
    if(user) {
        return true
    } else {
        return new Error("Operation unavailable for this user category")
    }
}

export const GetProcedures = async (_, res) => {
    try {
        const data = await ProcedureModel.find();
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}

export const GetProcedureById = async (req, res) => {
    const id = req.params.id;
    try {
        const _id = ObjectId(id);
        const data = await ProcedureModel.findOne({ _id });

        if (!data) {
            res.status(401).send({ error: `Procedure ${id} not found.` });
        } else {
            res.send({ data });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const GetProcedureByName = async (req, res) => {
    const name = req.body.name;
    try {
        const data = await ProcedureModel.findOne({ name: RegExp(name, "i") });

        if (!data) {
            res.status(401).send({ error: `Procedure named ${name} not found.` });
        } else {
            res.send({ data });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const GetProceduresByType = async (req, res) => {
    const type = req.body.type;
    try {
        const data = await ProcedureModel.findOne({ type: RegExp(type, "i") });
        if (!data) {
            res.status(401).send({ error: `Not found Procedures with type ${type}.` });
        } else {
            res.send({ data });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const CreateProcedure = async (req, res) => {
    const procedure = req.body;
    const { id } = req.auth;
    const _id = ObjectId(id);
    try {
        const auth = await userAuthorization(_id);
        if(!auth.message){
            const data = await ProcedureModel.create(procedure);
            if (!data) {
                res.status(500).send({ error: `Error creating procedure ${procedure}` });
            } else {
                const { _id, name, type, description, products } = data;
                res.send({ _id, name, type, description, products });
            }
        } else {
            res.status(401).send({ error: auth.message });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const UpdateProcedure = async (req, res) => {
    const procedure = req.body;
    const { id } = req.auth;
    const _id = ObjectId(id);
    try {
        const auth = await userAuthorization(_id);
        if (!auth.message) {
            const data = await ProcedureModel.updateOne({ "_id": procedure.id }, procedure);
            if (!data) {
                res.status(500).send({ error: `Error updating procedure ${procedure}` });
            } else {
                const { _id, name, type, description, products } = procedure;
                res.send({ _id, name, type, description, products });
            }
        } else {
            res.status(401).send({ error: auth.message });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const DeleteProcedure = async (req, res) => {
    const { id } = req.params;
    const userId = req.auth.id;
    let _id = ObjectId(userId);
    try {
        const auth = await userAuthorization(_id);
        if (!auth.message) {
        _id = ObjectId(id);
        const data = await ProcedureModel.deleteOne({ _id });
        if (data.n == 1) {
            res.send({ message: `Success to delete Procedure id ${id}` });
        } else {
            res.send({ message: `Non-existent Procedure id ${id}` });
        }
    } else {
        res.status(401).send({ error: auth.message });
    }
    } catch (err) {
        res.send({ error: err });
    }
}

