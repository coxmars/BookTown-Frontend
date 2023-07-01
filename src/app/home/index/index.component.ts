import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { Book } from 'src/app/admin/books/shared/book.model';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

  books: Book[] = [];

  constructor(
    private homeService: HomeService,
    private cartService: CartService
  ) { }


  ngOnInit(): void {
    this.homeService.getLastBooks()
      .subscribe(books => {
        this.books = books;
      })
  }

}
