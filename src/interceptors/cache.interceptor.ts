import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map<string, any>();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const key = request.url;

    if (this.cache.has(key)) {
      console.log(`Cache HIT for ${key}`);
      return of(this.cache.get(key));
    }

    return next.handle().pipe(
      tap(data => {
        console.log(`Cache MISS for ${key}`);
        this.cache.set(key, data);
      }),
    );
  }
}
