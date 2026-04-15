import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
    private books = [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
        { id: 2, title: '1984', author: 'George Orwell' },
    ];

    findAll() {
        return this.books;
    }

    findOne(id: number) {
        const book = this.books.find(b => b.id === id);
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }
}
