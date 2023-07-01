import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { WishlistService } from '../shared/wishlist.service';
import { CartService } from '../shared/cart.service';
import { Book } from 'src/app/admin/books/shared/book.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) { }

  
  ngOnInit(): void {
    
  }

  get wishlist() {
    return this.wishlistService.items;
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
