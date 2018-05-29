import appSettings from 'appSettings';
import logger from '../logger';

const getRouteWithServerFolder = path => {
  logger.info('Matching to Route: ' + appSettings.serverFolder + path);
  return appSettings.serverFolder + path;
};

export { getRouteWithServerFolder };
