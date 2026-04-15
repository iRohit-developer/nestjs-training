# Books API

This README only explains what each interceptor does and where it is applied.

## Applied Flow for Books Routes

- GET /books: LoggingInterceptor -> TransformInterceptor -> CacheInterceptor
- GET /books/:id: LoggingInterceptor -> TransformInterceptor -> ErrorMappingInterceptor
# Books API

This project demonstrates four NestJS interceptors and applies them at different scopes.

## Interceptors Overview

| Interceptor | What it does | Applied at |
|---|---|---|
| `LoggingInterceptor` | Logs incoming request method/url and total request time in ms. | Global (all routes) |
| `TransformInterceptor` | Wraps successful responses in a common envelope: `{ success, statusCode, timestamp, data }`. | `BooksController` class level |
| `CacheInterceptor` | Caches response data in memory by request URL. Returns cached value on repeated requests to same URL. | `GET /books` only |
| `ErrorMappingInterceptor` | Converts `Error('Book not found')` into Nest `NotFoundException` (HTTP 404). | `GET /books/:id` only |