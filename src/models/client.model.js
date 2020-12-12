import mongoose from 'mongoose';
import crypto from 'crypto';
import { ProceduresSchema } from './procedures.model.js';


const { Schema } = mongoose;

const clientSchema = new Schema({
    name:{
        type: String,
        uppercase: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    cellphone: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
        set: value => crypto.createHash('sha256').update(value).digest('hex'),
    },
    procedures: [ProceduresSchema]
    },
    {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
    versionKey: false,
    }
);

export const ClientModel = mongoose.model('client', clientSchema);