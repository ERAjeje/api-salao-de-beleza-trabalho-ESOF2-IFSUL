import mongoose from 'mongoose';

const { Schema } = mongoose;

export const ProceduresSchema = new Schema({
    procedureId: {
        type: String
    },
    userId: {
        type: String,
    },
    date: {
            type: String,
    },
    hour: {
            type: String,
    } 
},
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
        versionKey: false,
    }
);
