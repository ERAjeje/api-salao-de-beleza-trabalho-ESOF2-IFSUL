import express from 'express';
import v1Route from './src/routes/routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './src/data/mongo.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((_, res, next) => {
	//Qual site tem permissão de realizar a conexão
    res.header("Access-Control-Allow-Origin", "localhost");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
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