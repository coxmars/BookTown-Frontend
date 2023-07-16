import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookPage } from 'src/app/admin/books/shared/book.model';
import { environment } from 'src/environments/environment';
import { SalesOrder } from './sales-order.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }


  getLastBooks(): Observable<Book[]> { 
    return this.http.get<Book[]>(`${environment.apiBase}/home/last-books`);
  } 
  
  getBooks(page: number = 0, size: number = 6): Observable<BookPage> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('sort', 'createdAt,desc');

    return this.http.get<BookPage>(`${environment.apiBase}/home/books`, { params });
  } 
  
  getBook(slug: string): Observable<Book> {
    return this.http.get<Book>(`${environment.apiBase}/home/books/${slug}`);
  }

  createPaypalCheckout(bookIds: number[]): Observable<any> {
    const returnUrl = 'http://localhost:4200/cart'
    return this.http.post(`${environment.apiBase}/home/checkout/paypal/create?returnUrl=${returnUrl}`, bookIds);
  }

  capturePaypalCheckout(token: string): Observable<any> {
    return this.http.post(`${environment.apiBase}/home/checkout/paypal/capture?token=${token}`, null);
  }

  getOrder(id: number): Observable<SalesOrder> {
    return this.http.get<SalesOrder>(`${environment.apiBase}/home/orders/${id}`);
  }

  downloadBookFromSalesItem(orderId: number, itemId: number): Observable<any> {
    return this.http.get(`${environment.apiBase}/home/orders/${orderId}/items/${itemId}/book/download`, {
      responseType: 'blob'
    });
  }

}
