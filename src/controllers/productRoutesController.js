import { UserModel } from '../models/user.model.js';
import { verify } from '../utils/jwt.js';
import { ObjectId, ProductModel } from '../models/product.model.js';


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


export const GetProducts = async (_, res) => {
    try {
        const data = await ProductModel.find();
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}

export const GetProductById = async (req, res) => {
    const id = req.body.id;
    try {
        const _id = ObjectId(id);
        const data = await ProductModel.findOne({ _id });

        if (!data) {
            res.status(401).send({ error: `Product ${id} not found.` });
        } else {
            res.send({ data });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const GetProductByName = async (req, res) => {
    const name = req.body.name;
    try {
        const data = await ProductModel.find({ name: RegExp(name) });

        if (!data) {
            res.status(401).send({ error: `Product ${name} not found.` });
        } else {
            res.send({ data });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const GetProductsByType = async (req, res) => {
    const type = req.body.type;
    try {
        const data = await ProductModel.find({ type });

        if (!data) {
            res.status(401).send({ error: `Not found Products with type ${type}.` });
        } else {
            res.send({ data });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const CreateProduct = async (req, res) => {
    const Product = req.body;
    try {
        const data = await ProductModel.create(Product);
        if (!data) {
            res.status(500).send({ error: `Error creating Product ${Product}` });
        } else {
            const { _id, name, type, description, unitQuantity, purchasePrice } = data;
            res.send({ _id, name, type, description, unitQuantity, purchasePrice });
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const UpdateProduct = async (req, res) => {
    const Product = req.body;
    try {
        const data = await ProductModel.updateOne(Product);
        if (!data) {
            res.status(500).send({ error: `Error updating Product ${Product}` });
        } else {
            res.send(Product);
        }
    } catch (err) {
        res.send({ error: err });
    }
}

export const DeleteProduct = async (req, res) => {
    const id = req.body.id;
    try {
        const _id = ObjectId(id);
        const data = await ProductModel.deleteOne({ _id });
        if(data.n){
            res.send({ message: `Success to delete Product id ${id}` });
        }else{
            res.send({ message: `Non-existent Product id ${id}` });
        }
    } catch (err) {
        res.send({ error: err });
    }
}
