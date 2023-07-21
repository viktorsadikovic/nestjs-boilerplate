import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { Environment } from '../common/enums';

export function setupSwagger(app: INestApplication): void {
  const configService = app.get(ConfigService);

  if (configService.get('app.env') != Environment.LOCAL) {
    const username: string = configService.get('app.swagger.user');
    const password: string = configService.get('app.swagger.password');
    const credentials: any = {};
    credentials[username] = password;
    app.use(
      [
        `/${configService.get('app.apiPrefix')}/${configService.get(
          'app.apiVersion',
        )}/${configService.get('app.swagger.path')}`,
        `/${configService.get('app.apiPrefix')}/${configService.get(
          'app.apiVersion',
        )}/${configService.get('app.swagger.path')}-json`,
      ],
      basicAuth({
        challenge: true,
        users: credentials,
      }),
    );
  }

  const documentBuilder = new DocumentBuilder()
    .setTitle(`${configService.get('app.name')} API Documentation`)
    .setDescription('API Docs Description')
    .setExternalDoc(
      'Swagger JSON file',
      `/${configService.get('app.apiPrefix')}/${configService.get(
        'app.apiVersion',
      )}/${configService.get('app.swagger.path')}-json`,
    )
    .setVersion(configService.get('app.apiVersion'))
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'accessToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup(
    `${configService.get('app.apiPrefix')}/${configService.get(
      'app.apiVersion',
    )}/${configService.get('app.swagger.path')}`,
    app,
    document,
    {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    },
  );
}
