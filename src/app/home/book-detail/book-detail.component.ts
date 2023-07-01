import { Component } from '@angular/core';
import { Book } from 'src/app/admin/books/shared/book.model';
import { HomeService } from '../shared/home.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { WishlistService } from '../shared/wishlist.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})


export class BookDetailComponent {

  book?: Book;

  constructor(
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const slug = params['slug'];
      this.homeService.getBook(slug)
        .subscribe(book => {
          this.book = book;
        });
    });
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
