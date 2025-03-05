import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './routes/index';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import errorHandler from './utils/errorHandler';
const app: Application = express();
import swaggerDocument from './swagger.json';

app.use(bodyParser.json());
app.use(cors());
app.use("/api",MainRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup( swaggerDocument )
);
app.use(errorHandler);

export default app;
