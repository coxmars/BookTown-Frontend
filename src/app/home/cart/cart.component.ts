import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Book } from 'src/app/admin/books/shared/book.model';
import { WishlistService } from '../shared/wishlist.service';
import { HomeService } from '../shared/home.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  loading = false;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');

    if (token) {
      this.loading = true;

      this.homeService.capturePaypalCheckout(token)
        .subscribe(response => {
          if (response.completed) {
            this.cartService.clear();
            this.router.navigate(['/orders', response.orderId]);
          }
        });

    }

  }

  get total() {
    return this.items.map(item => item.price).reduce((prevBook, nextBook) => prevBook + nextBook, 0);
  }

  // Se usa para mostrar el carrito en la barra de navegación
  get items() {
    return this.cartService.items;
  }

  get wishlist() {
    return this.wishlistService.items;
  }

  remove(book: Book) {
    this.cartService.removeItem(book);
  }

  removeFromWishlist(book: Book) {
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

  pay() {
    // Se obtienen los ids de los libros del carrito y se pone signo de admiración para indicar que no es nulo
    const bookIds = this.items.map(item => item.id!);
    this.loading = true;

    this.homeService.createPaypalCheckout(bookIds)
      .subscribe(response => {
        // Esto fuerza al navegador a ir a la url que se le pasa
        window.location = response.approveUrl;
      });

  }

}
