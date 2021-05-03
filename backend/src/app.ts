import express from 'express';
import { bodyParser, cors } from './middlewares';
import routes from './routes';

const app = express();

app.use(bodyParser);
app.use(cors);
app.disable('x-powered-by');

app.use(routes);

export default app;
