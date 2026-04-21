import { Injectable, NotFoundException } from '@nestjs/common';
import { OutOfStockException } from '../common/exceptions/out-of-stock.exception';

@Injectable()
export class ProductsService {
  private products = [
    { id: 1, name: 'Laptop', price: 1200, stock: 3 },
    { id: 2, name: 'Mouse', price: 25, stock: 25 },
  ];

  findById(id: number) {
    return this.products.find(p => p.id === id);
  }

  purchaseProduct(id: number, quantity: number) {
    const product = this.findById(id);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    if (quantity > product.stock) {
      throw new OutOfStockException(
        product.name,
        quantity,
        product.stock,
      );
    }

    product.stock -= quantity;
    return product;
  }
}