import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './routes/index';
import cors from 'cors';
import { expressjwt } from 'express-jwt';
const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api",MainRouter);


export default app;
