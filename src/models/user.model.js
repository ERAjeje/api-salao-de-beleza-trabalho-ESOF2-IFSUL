import mongoose from 'mongoose';


const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
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
    },
    },
    {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
    }
);

export const UserModel = mongoose.model('user', userSchema, 'users');