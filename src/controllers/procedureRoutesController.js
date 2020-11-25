import { ObjectId, ProcedureModel } from '../models/procedure.model.js';

export const GetProcedures = async (_, res) => {
    try {
        const data = await ProcedureModel.find();
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}

export const GetProcedureById = async (req, res) => {
    const id = req.body.id;
    const _id = ObjectId(id);
    try {
        const data = await ClientModel.findOne({ _id });

        if(!data){
            res.status(401).send({ error: `Procedure ${id} not found.` });
        }else{
            res.send({ data });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const GetProcedureByName = async (req, res) => {
    const name = req.body.name;
    try {
        const data = await ClientModel.findOne({ name });

        if(!data){
            res.status(401).send({ error: `Procedure ${name} not found.` });
        }else{
            res.send({ data });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const GetProceduresByType = async (req, res) => {
    const type = req.body.type;
    try {
        const data = await ClientModel.findOne({ type });

        if(!data){
            res.status(401).send({ error: `Not found Procedures with type ${type}.` });
        }else{
            res.send({ data });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const CreateProcedure = async (req, res) => {
    const procedure = req.body;
    try {
        const data = await ProcedureModel.create(procedure);
        if(!data){
            res.status(500).send({ error: `Error creating procedure ${procedure}` });
        }else{
            const { _id, name, type, description, products } = data;
            res.send({ _id, name, type, description, products });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const UpdateProcedure = async (req, res) => {
    const procedure = req.body;
    try {
        const data = await ProcedureModel.updateOne(procedure);
        if(!data){
            res.status(500).send({ error: `Error updating procedure ${procedure}` });
        }else{
            const { _id, name, type, description, products } = data;
            res.send({ _id, name, type, description, products });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const DeleteProcedure = async (req, res) => {
    const id = req.body;
    const _id = ObjectId(id);
    try {
        ProcedureModel.deleteOne({ _id });
        res.send({ message: `Success to delete procedure id ${id}` });
    } catch (err) {
        res.send({ error: err });
    }
}
