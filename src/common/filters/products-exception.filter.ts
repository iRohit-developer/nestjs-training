/**
 * Q1. Why is @UseFilters(ProductsExceptionFilter) placed on the controller class
 *     rather than registered inside main.ts?
 *
 *     Because this filter contains business-context-specific behavior that is
 *     relevant only to ProductsController. Registering it globally would affect
 *     unrelated domains (e.g., Orders) and violate separation of concerns.
 *
 * Q2. If both GlobalHttpExceptionFilter (global) and ProductsExceptionFilter
 *     (scoped) can catch NotFoundException, which one runs for GET /products/99,
 *     and why?
 *
 *     The scoped ProductsExceptionFilter runs first because controller-scoped
 *     filters have higher priority than global filters in NestJS’s execution order.
 *
 * Q3. What is the difference between handling errors in an interceptor via
 *     catchError() versus using an Exception Filter?
 *
 *     Interceptors handle observable streams and cross-cutting concerns like
 *     logging or response mapping, while Exception Filters are designed
 *     specifically to transform and format thrown exceptions into HTTP responses.
 */

import {
  Catch,
  ExceptionFilter,
  NotFoundException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class ProductsExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(404).json({
      success: false,
      statusCode: 404,
      error: exception.message,
      suggestion: 'Check the product ID or view all products at GET /products',
    });
  }
}
