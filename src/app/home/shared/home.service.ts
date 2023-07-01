import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookPage } from 'src/app/admin/books/shared/book.model';
import { environment } from 'src/environments/environment';

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

  

}
