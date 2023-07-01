import { Component } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Book } from 'src/app/admin/books/shared/book.model';
import { WishlistService } from '../shared/wishlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) { }

  get total () {
    return this.items.map(item => item.price).reduce((prevBook, nextBook) => prevBook + nextBook, 0);
  }

    // Se usa para mostrar el carrito en la barra de navegación
  get items() {
    return this.cartService.items;
  }

  get wishlist() {
    return this.wishlistService.items;
  }

  remove (book: Book) {
    this.cartService.removeItem(book);
  }

  removeFromWishlist (book: Book) {
    this.wishlistService.removeItem(book);
  }

  addToWishlist(book: Book) {
    if (!this.wishlistService.itemAlreadyExists(book)) {
      if (this.cartService.itemAlreadyExists(book)) {
        this.remove(book);
        this.wishlistService.addItem(book);
      }
      else {
        this.wishlistService.addItem(book);
      }
    }
  }

  addToCart(book: Book) {
    if (!this.cartService.itemAlreadyExists(book)) {
      if (this.wishlistService.itemAlreadyExists(book)) {
        this.removeFromWishlist(book);
        this.cartService.addItem(book);
      }
      else {
        this.cartService.addItem(book);
      }
    }
  }

}
