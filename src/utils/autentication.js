import { verify } from '../utils/jwt.js';

export const autentication = async (req, res, next, model) => {
    const [type, token] = req.headers.authorization.split(" ");
    try {
        const payload = verify(token);
        const user = await model.findById(payload.user);
        if(!user){
            res.status(401).send({ error: `User ${email} not found.` });
        }
        req.auth = user;
        next();
    } catch (err) {
        res.send({ error: err });
    }
}