import Express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import appSettings from 'appSettings';
import logger from '../logger';
import renderServer from './renderServer';

const app = Express();
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));

const port = appSettings.port;

app.use(appSettings.serverFolder + '/static', Express.static('static'));
app.use(handleRender);

function handleRender(req, res) {
  logger.info('Received request ' + req.url);
  renderServer(req, res);
}

app.listen(port, () => logger.info(`Starting Node server at port ${port}...`));
