import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters';
import {
  FormatResponseInterceptor,
  LoggingInterceptor,
} from './common/interceptors';
import { MorganMiddleware } from './common/middlewares';
import { setupSwagger } from './config';
import { WinstonLogger } from './config/winston-logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonLogger,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(
    `${configService.get('app.apiPrefix')}/${configService.get(
      'app.apiVersion',
    )}`,
    {
      exclude: [{ path: '/', method: RequestMethod.GET }],
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
    // new I18nValidationPipe({ whitelist: true }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new FormatResponseInterceptor(),
    new LoggingInterceptor(),
  );

  setupSwagger(app);

  app.use(MorganMiddleware);
  app.use(compression());
  app.use(helmet());

  await app.listen(configService.get('app.port'));
}
bootstrap();
