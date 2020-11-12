import jwt from 'jsonwebtoken';

export const sign = payload => jwt.sign(payload, process.env.SECRET, { expiresIn: 86400 });
export const verify = token => jwt.verify(token, process.env.SECRET);