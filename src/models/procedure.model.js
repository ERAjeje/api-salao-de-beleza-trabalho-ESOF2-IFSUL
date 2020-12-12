import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProdutInProcedureSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    }
});

const ProcedureSchema = new Schema({
    name: {
        type: String,
        unique: true,
        uppercase: true,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    products: [ProdutInProcedureSchema],
},
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
        versionKey: false,
    }
);

export const ProcedureModel = mongoose.model('procedure', ProcedureSchema, 'procedure');
export const ObjectId = mongoose.Types.ObjectId;