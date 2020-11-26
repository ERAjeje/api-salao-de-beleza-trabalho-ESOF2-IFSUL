import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { db } from './src/data/mongo.js';

import v1Route from './src/routes/routes.js';
import ProductRoute from './src/routes/productRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,PUT,POST,DELETE"
}));
app.use('/v1', v1Route);
app.use('/v1/products', ProductRoute);

app.listen(3000, async () => {
    console.log("api em funcionamento");
    try {
        await db.mongoose.connect(db.url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("conectado ao banco com sucesso.");
    } catch(err) {
        console.log("error: "+err);
        process.exit();
    }
})