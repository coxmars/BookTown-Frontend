import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { Book, BookPage } from 'src/app/admin/books/shared/book.model';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  books: Book[] = [];
  page = 0;

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.homeService.getBooks()
      .subscribe(bookPage => {
        this.books = bookPage.content;
        this.page = bookPage.number;
      })
  }

  // Load more books and add them to the books array
  loadMoreBooks () {
    this.homeService.getBooks(this.page + 1)
      .subscribe(bookPage => {
        this.books.push(...bookPage.content);
        this.page = bookPage.number;
      })
  }

}
