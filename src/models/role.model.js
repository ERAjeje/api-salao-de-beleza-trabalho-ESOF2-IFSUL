import mongoose from 'mongoose';

const { Schema } = mongoose;

const RoleSchema = new Schema({
    description: {
        type: String,
        unique: true
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
        versionKey: false,
    }
);

export const RoleModel = mongoose.model('role', RoleSchema);
export const ObjectId = mongoose.Types.ObjectId;