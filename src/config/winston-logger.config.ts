import { LoggerService } from '@nestjs/common';
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';
import { Environment } from '../common/enums';

let config: WinstonModuleOptions = null;
if (process.env.APP_ENV === Environment.LOCAL) {
  config = {
    level: 'debug',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      utilities.format.nestLike(),
    ),
    exitOnError: false,
    transports: [new winston.transports.Console()],
  };
} else {
  config = {
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      winston.format.json(),
    ),
    exitOnError: false,
    transports: [
      new winston.transports.Console(),
      new WinstonCloudWatch({
        name: 'Cloudwatch Logs',
        logGroupName: `${process.env.APP_NAME}-${process.env.APP_ENV}`,
        logStreamName: function () {
          const date = new Date().toISOString().split('T')[0];
          return date;
        },
        awsRegion: 'us-east-1',
        jsonMessage: true,
      }),
    ],
  };
}

export const WinstonLogger: LoggerService = WinstonModule.createLogger(config);
