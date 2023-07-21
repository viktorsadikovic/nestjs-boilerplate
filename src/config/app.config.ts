import { registerAs } from '@nestjs/config';

export const AppConfigurations = registerAs('app', () => ({
  env: process.env.APP_ENV || 'development',
  name: process.env.APP_NAME || 'NestJS Boilerplate App',
  frontendDomain: process.env.FRONTEND_DOMAIN,
  backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost',
  port: process.env.APP_PORT
    ? parseInt(process.env.APP_PORT, 10)
    : process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  apiVersion: process.env.API_VERSION || 'v1',
  swagger: {
    path: process.env.SWAGGER_PATH || 'docs',
    user: process.env.SWAGGER_USER,
    password: process.env.SWAGGER_PASSWORD,
  },
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
  headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
  throttler: {
    ttl: process.env.THROTTLER_TTL || 60,
    limit: process.env.THROTTLER_LIMIT || 20,
  },
}));
