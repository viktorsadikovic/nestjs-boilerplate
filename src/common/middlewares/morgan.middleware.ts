import * as morgan from 'morgan';
import { WinstonLogger } from '../../config';

const skipRoutes = ['/api/v1/health'];

const morganFormat = (tokens, req, res): string | null => {
  if (skipRoutes.includes(req.path)) {
    return null;
  }
  const log = {
    status: tokens.status(req, res),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    ['http_version']: tokens['http-version'](req, res),
    ['response_length']: tokens.res(req, res, 'content-length') || '0',
    ['user_agent']: tokens['user-agent'](req, res),
    timestamp: new Date().toISOString(),
    ...(req.companyId && { projectId: req.companyId }),
  };

  return JSON.stringify(log);
};

export const MorganMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => WinstonLogger.log(message.trim(), 'HTTP'),
  },
});
