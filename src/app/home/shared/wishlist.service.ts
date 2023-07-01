import { Injectable } from '@angular/core';
import { Book } from 'src/app/admin/books/shared/book.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private key = 'storebook_wishlist2023';
  private _items: Book[] = [];

  constructor() { 
    const itemsString = localStorage.getItem(this.key);
    // Si hay algo en el local storage lo parseamos y lo guardamos en el array de items
    this._items = itemsString ? JSON.parse(itemsString) : [];
  }

  get items() { 
    return this._items;
  } 
  
  addItem(book: Book) { 
    this._items.push(book);
    this.saveInLocalStorage();
  } 
  
  removeItem(book: Book) { 
    this._items = this._items.filter(item => item.id != book.id);
    this.saveInLocalStorage();
  } 
  
  clear() { 
    this._items = [];
    this.saveInLocalStorage();
  } 
  
  itemAlreadyExists(book: Book): boolean { 
    return this._items.findIndex(i => i.id === book.id) >= 0;
  }

  saveInLocalStorage () {
    localStorage.setItem(this.key, JSON.stringify(this._items));
  }

  
}
