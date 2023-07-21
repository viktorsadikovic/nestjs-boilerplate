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
    let message: string[] | string = exception.message || null;

    if (statusCode === 500) {
      status = ResponseStatus.ERROR;
    }

    if (statusCode === 400 && exception.getResponse()['message']) {
      message = exception.getResponse()['message'];
    }

    if (typeof message === 'string') {
      message = [message];
    }

    const body = {
      status,
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      endpoint: request.url,
    };

    this.logger.warn(
      `{status: '${status}', message: '${message}', code: '${statusCode}', timestamp: ${new Date().toISOString()}, endpoint: ${
        request.url
      }}`,
    );

    response.status(statusCode).json(body);
  }
}
