import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookPage } from './book.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient // Importante: Inyectar el servicio HttpClient
  ) { }

  
  // Método para obtener la lista de libros, se usa Observable<any> para que el método retorne un Observable
  paginate (size: number = 5, page: number = 0): Observable<BookPage> {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'createdAt,desc');
    return this.http.get<BookPage>(`${environment.apiBase}/admin/books`, { params: params });
  }

  get (id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.apiBase}/admin/books/find/${id}`);
  }

  create (book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.apiBase}/admin/books/save`,book);
  }

  update (id: number, book: Book) {
    return this.http.put<Book>(`${environment.apiBase}/admin/books/update/${id}`,book);
  }

  delete (id: number) {
    return this.http.delete(`${environment.apiBase}/admin/books/delete/${id}`);
  }

  uploadFile (formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiBase}/media/upload`, formData);
  }

}
