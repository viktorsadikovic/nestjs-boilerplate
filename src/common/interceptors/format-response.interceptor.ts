import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseStatus } from '../enums/response-status.enum';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(FormatResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        value = value ? value : [];
        return { status: ResponseStatus.SUCCESS, data: value };
      }),
    );
  }
}
