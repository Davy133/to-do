import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './routes/index';
import cors from 'cors';

const app: Application = express();

app.use(bodyParser.json());
app.use("/api",MainRouter);
app.use(cors());

export default app;
