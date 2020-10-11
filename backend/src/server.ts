import express, { Response, Request } from 'express';
import routes from './routes';
import cors from 'cors';

require("dotenv-safe").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(3333);
