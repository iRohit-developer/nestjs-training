import { Controller, UseInterceptors, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { BooksService } from './books.service';
import { CacheInterceptor } from 'src/interceptors/cache.interceptor';
import { ErrorMappingInterceptor } from 'src/interceptors/error-mapping.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
@UseInterceptors(TransformInterceptor)
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @ApiOperation({ summary: 'Get all books', description: 'Caching - hit this URL twice, the second request will be served from cache.' })
    @Get()
    @UseInterceptors(CacheInterceptor)
    findAll() {
        return this.booksService.findAll();
    }

    @ApiOperation({ summary: 'Get a book by ID', description: 'Retrieve a single book by its ID.' })
    @Get(':id')
    @UseInterceptors(ErrorMappingInterceptor)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.findOne(id);
    }

}
