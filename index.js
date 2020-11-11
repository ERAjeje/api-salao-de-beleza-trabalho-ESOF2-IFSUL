import express from 'express';
import v1Route from './src/routes/routes.js';
import { db } from './src/data/mongo.js';

const app = express();
app.use('/v1', v1Route);

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