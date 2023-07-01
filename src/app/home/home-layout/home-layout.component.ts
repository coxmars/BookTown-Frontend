import { Component } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { WishlistService } from '../shared/wishlist.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})


export class HomeLayoutComponent {

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) { }

  // Se usa para mostrar el carrito en la barra de navegación
  get cartItems() {
    return this.cartService.items;
  }

  // Se usa para mostrar los favoritos/wishlist en la barra de navegación
  get wishListItems() {
    return this.wishlistService.items;
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (let item of this.cartItems) {
      if (item.price) {
        totalPrice += item.price;
      }
    }
    return totalPrice;
  }
  

}
