import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class ErrorMappingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        if (err instanceof Error && err.message === 'Book not found') {
          throw new NotFoundException(err.message);
        }
        throw err;
      }),
    );
  }
}
