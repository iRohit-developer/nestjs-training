import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    // Dependency Injection happens here
    constructor(private readonly productService: ProductService) {}

    @Get()
    getAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.productService.findOne(Number(id));
    }

    @Get('expensive/:minPrice')
    getExpensiveProducts(@Param('minPrice') minPrice: string) {
        return this.productService.findExpensiveProducts(Number(minPrice));
    }

    @Get('search/title')
    searchByTitle(@Query('title') title: string) {
        return this.productService.filterByTitle(title);
    }

    @Get('search/category')
    searchByCategory(@Query('category') category: string) {
        return this.productService.filterByCategory(category);
    }

    @Get('search/price-range')
    searchByPriceRange(
        @Query('minPrice') minPrice?: string,
        @Query('maxPrice') maxPrice?: string,
    ) {
        const min = minPrice ? Number(minPrice) : 0;
        const max = maxPrice ? Number(maxPrice) : Number.MAX_VALUE;
        return this.productService.filterByPriceRange(min, max);
    }
    
}
