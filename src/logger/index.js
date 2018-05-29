import winston from 'winston';
import appSettings from 'appSettings';

// define server side logger
const logLevel = appSettings.logLevel;
const tsFormat = () => new Date().toLocaleTimeString();
const serverLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      json: true,
      stringify: obj => {
        obj.tag = 'clubcardpartnersapp';
        return JSON.stringify(obj);
      },
      timestamp: tsFormat,
      colorize: true,
      level: `${logLevel}`
    })
  ]
});

// define client side logger
const clientSideLoggerLabel = 'Client Side Logger: ';
const clientLogger = {
  info: msg => {
    console.log('INFO: ', msg);
  },
  error: (msg, stack) => {
    stack = stack || '';
    fetch(appSettings.apiEndpoints.logger + '/error', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        msg: clientSideLoggerLabel + msg,
        stack: stack.substr(stack.indexOf('\n') + 1)
      })
    });
    console.error('ERROR: ', msg);
  }
};

let logger = typeof window === 'undefined' ? serverLogger : clientLogger;
export { logger as default, serverLogger, clientLogger };
