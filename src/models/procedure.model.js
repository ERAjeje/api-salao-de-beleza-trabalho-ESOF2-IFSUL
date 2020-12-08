import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProcedureSchema = new Schema({
    name: {
        type: String,
        unique: true,
        uppercase: true,
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    products: {
        productId: {
            type: String,
            required: true,
            unique: true,
        },
        unit: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
        required: true,
    },
},
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
        versionKey: false,
    }
);

export const ProcedureModel = mongoose.model('procedure', ProcedureSchema, 'procedure');
export const ObjectId = mongoose.type.ObjectId;