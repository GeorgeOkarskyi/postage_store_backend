import express from 'express';
import { authenticate } from './middlewares/authenticate.middleware';
import { SERVER_STARTED_MESSAGE } from './constants';
import { appRouter } from './router';

const port = 8000;
const app = express();

app.use(express.json());
app.use(authenticate)
app.use(appRouter);


app.listen(port, () => {
    console.log(`${SERVER_STARTED_MESSAGE} ${port}`);
})