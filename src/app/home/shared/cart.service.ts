import { Injectable } from '@angular/core';
import { Book } from 'src/app/admin/books/shared/book.model';

@Injectable({
  providedIn: 'root'
})

// Para este carrito no usamos apis si no que usamos el local storage del navegador
export class CartService {

  private key = 'storebook_cart2023';
  private _items: Book[] = [];

  // Los libros se guardan en el local storage, pero cuando se refresca la página parece que se pierden ya que se cambia el boton a añadir
  // por eso se usa local storage el constructor para recuperarlos
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

  // Con esto guardamos el carrito en el local storage del navegador, se usa JSON.stringify para convertir el array de objetos en un string
  // Se usa cada vez que se modifica el carrito
  saveInLocalStorage () {
    localStorage.setItem(this.key, JSON.stringify(this._items));
  }

}
