import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Book } from 'src/app/admin/books/shared/book.model';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})  

export class BookCardComponent implements OnInit {

  @Input() book!: Book;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
  }

  addBookToCart (book: Book) {
    if (!this.cartService.itemAlreadyExists(book)) {
      if (this.wishlistService.itemAlreadyExists(book)) {
        this.removeBookFromWishList(book);
        this.cartService.addItem(book);
      }
      else {
        this.cartService.addItem(book);
      }
    }
  }

  removeBookFromCart (book: Book) {
    this.cartService.removeItem(book);
  }

  bookAlreadyExistsInCart (book: Book): boolean {
    return this.cartService.itemAlreadyExists(book);
  }

  addBookToWishList (book: Book) {
    if (!this.wishlistService.itemAlreadyExists(book)) {
      if (this.cartService.itemAlreadyExists(book)) {
        this.removeBookFromCart(book);
        this.wishlistService.addItem(book);
      }
      else {
        this.wishlistService.addItem(book);
      }
    }
  }

  removeBookFromWishList (book: Book) {
    this.wishlistService.removeItem(book);
  }

  bookAlreadyExistsInWishList (book: Book): boolean {
    return this.wishlistService.itemAlreadyExists(book);
  }

}
