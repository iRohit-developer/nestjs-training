import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();
    console.log(`Incoming request: ${method} ${url}`);
    return next.handle().pipe(
      tap(() => console.log(`Request completed: ${method} ${url} - ${Date.now() - now}ms`)),
    );
  }
}
