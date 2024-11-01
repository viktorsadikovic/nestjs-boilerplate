import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseStatus } from '../enums/response-status.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    let status: ResponseStatus = ResponseStatus.FAIL;
    let errors: string[] | string = exception.message || null;
    const description = exception.getResponse()['error'];

    if (statusCode === 500) {
      status = ResponseStatus.ERROR;
    }

    if (statusCode === 400 && exception.getResponse()['message'].length) {
      errors = exception.getResponse()['message'];
    }

    if (typeof errors === 'string') {
      errors = [errors];
    }

    const body = {
      statusCode,
      description,
      errors,
    };

    this.logger.warn(
      `{status: '${status}', message: '${errors}', code: '${statusCode}', timestamp: ${new Date().toISOString()}, endpoint: ${
        request.url
      }}`,
    );

    response.status(statusCode).json(body);
  }
}
