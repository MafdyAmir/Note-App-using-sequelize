import express from 'express';
const app = express();
const port =3000;

import { bootstrap } from './src/index.routers.js';

bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))