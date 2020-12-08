import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProceduresSchema = new Schema({
    procedureId: {
        type: ObjectId,
        unique: true
    },
    clientId: {
        type: ObjectId,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true,
    },
    date: {
            type: String,
            required: true,
    },
    hour: {
            type: String,
            required: true,
    }
        
},
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
        versionKey: false,
    }
);

export const ProceduresModel = mongoose.model('procedures', ProceduresSchema);
export const ObjectId = mongoose.Types.ObjectId;