import express from 'express';
import path from 'path';
import { config } from 'dotenv';

const rootPath = process.cwd();

config({
  path: path.join(rootPath, './.env')
});

import routes from './routes';

const PORT = process.env.PORT;

const app = express();

routes.forEach(route => {
  app.use(route);
});

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});