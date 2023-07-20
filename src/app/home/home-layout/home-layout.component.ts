import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { WishlistService } from '../shared/wishlist.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { User } from 'src/app/auth/shared/auth.model';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})


export class HomeLayoutComponent implements OnInit {

  currentUser?: User;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.authService.getAuthenticationState()
      .subscribe(user => this.currentUser = user);
  }


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
  
  // It is used to show the user name in the navigation bar
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }

}
