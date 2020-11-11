import mongoose from 'mongoose';
import { UserModel } from '../models/user.model.js';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URL;
db.User = UserModel;

export { db };