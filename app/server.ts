require('dotenv').config();

import express, { Express } from 'express';

import cors from 'cors';

import routes from './routes';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/api', routes);

const PORT: number | string = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
