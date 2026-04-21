import {
  Controller,
  Post,
  Param,
  Body,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductsExceptionFilter } from '../common/filters/products-exception.filter';

@UseFilters(ProductsExceptionFilter)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(':id/purchase')
  @ApiOperation({ summary: 'Purchase a product and deduct stock' })
  @ApiBody({
    schema: {
        type: 'object',
        properties: {
        quantity: {
            type: 'number',
            example: 2,
        },
        },
    },
    })

    @ApiResponse({
    status: 200,
    description: 'Product purchased successfully',
    })

    @ApiResponse({
    status: 422,
    description: 'Not enough stock available',
    })

    @ApiResponse({
    status: 404,
    description: 'Product not found',
    })

  purchaseProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body('quantity') quantity: number,
  ) {
    return this.productsService.purchaseProduct(id, quantity);
  }
}
