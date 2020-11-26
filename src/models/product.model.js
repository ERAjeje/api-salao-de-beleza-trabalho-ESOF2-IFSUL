import mongoose from 'mongoose';


const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        uppercase: true,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    unitQuantity: {
        type: Number,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
        versionKey: false,
    }
);

export const ProductModel = mongoose.model('product', productSchema);
export const ObjectId = mongoose.Types.ObjectId;