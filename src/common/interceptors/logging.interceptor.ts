import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        const request = context.switchToHttp().getRequest();
        const logMessage = {
          status: error.status || 500,
          method: request.method,
          url: request.url,
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        };

        if (error.status && error.status < 500) {
          this.logger.warn(JSON.stringify(logMessage));
        } else {
          this.logger.error(JSON.stringify(logMessage));
        }
        return throwError(() => error);
      }),
    );
  }
}
