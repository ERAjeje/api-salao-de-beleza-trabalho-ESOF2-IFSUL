import mongoose from 'mongoose';
import crypto from 'crypto';


const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
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
    role: {
        type: String,
        required: true
    }
    },
    {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
    versionKey: false,
    }
);

export const UserModel = mongoose.model('user', userSchema, 'users');
export const ObjectId = mongoose.Types.ObjectId;