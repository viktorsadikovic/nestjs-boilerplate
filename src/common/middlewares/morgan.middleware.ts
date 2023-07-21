import * as morgan from 'morgan';
import { WinstonLogger } from '../../config/winston-logger.config';

export const MorganMiddleware = morgan(
  '{method::method, url::url, http-version::http-version, status::status, res::res[content-length], user-agent::user-agent }',
  {
    stream: {
      write: (message) => WinstonLogger.log(message.trim(), 'HTTP'),
    },
  },
);
