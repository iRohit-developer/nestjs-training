import { Injectable } from '@nestjs/common';
import { products } from './products.data';

@Injectable()
export class ProductService {
    private products = products;

    findAll() {
        return this.products;
    }

    findOne(id: number) {
        return this.products.find(product => product.id === id);
    }

    findExpensiveProducts(minPrice: number) {
        return this.products.filter(product => product.price >= minPrice);
    }

    filterByTitle(query: string) {
        const lowerQuery = query.toLowerCase();
        return this.products.filter(product =>
            product.title.toLowerCase().includes(lowerQuery)
        );
    }

    filterByCategory(category: string) {
        const lowerCategory = category.toLowerCase();
        return this.products.filter(product =>
            product.category.toLowerCase() === lowerCategory
        );
    }

    filterByPriceRange(minPrice: number, maxPrice: number) {
        return this.products.filter(product =>
            product.price >= minPrice && product.price <= maxPrice
        );
    }
}
