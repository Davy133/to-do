import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './routes/index';
import cors from 'cors';
import { expressjwt } from 'express-jwt';
import errorHandler from './utils/errorHandler';
const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api",MainRouter);
app.use(errorHandler);

export default app;
