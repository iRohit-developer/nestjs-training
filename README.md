# Inventory API

NestJS API for product purchase flow with custom exception handling.

## Functionality

- Maintains products in memory.
- Supports purchasing a product by id and quantity.
- Deducts stock on successful purchase.
- Returns structured errors for invalid purchase scenarios.

Initial products:

- `Laptop` (id: 1, stock: 3)
- `Mouse` (id: 2, stock: 25)

## API

Base URL: `http://localhost:3000`

Swagger UI: `http://localhost:3000/api`

### Purchase Product

`POST /products/:id/purchase`

Request body:

```json
{
  "quantity": 2
}
```

Success (`200`):

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 1200,
  "stock": 1
}
```

## Product Exceptions

### Out of Stock (`422`)

Thrown when requested quantity is greater than available stock.

```json
{
  "success": false,
  "statusCode": 422,
  "error": "Cannot order 10 units of 'Laptop' - only 3 in stock",
  "productName": "Laptop",
  "requestedQuantity": 10,
  "availableStock": 3
}
```

### Product Not Found (`404`)

Handled by product-specific exception filter.

```json
{
  "success": false,
  "statusCode": 404,
  "error": "Product #99 not found",
  "suggestion": "Check the product ID or view all products at GET /products"
}
```
