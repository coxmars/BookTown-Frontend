import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Book, BookPage } from '../shared/book.model';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})


export class BookListComponent implements OnInit  {

  bookPage?: BookPage; // Variable global para enviar a la vista
  displayedColumns: string[] = ['title', 'price', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Book>([]);
  totalElements: number = 0;
  pageSize: number = 0;



  constructor(
    private bookService: BookService,
    public _MatPaginatorIntl: MatPaginatorIntl // Para cambiar el idioma del paginador
  ) { }


  ngOnInit(): void {
    this.getBooks();
    // Configuracion del paginador
    this._MatPaginatorIntl.itemsPerPageLabel = 'Cantidad de libros por página';
    this._MatPaginatorIntl.firstPageLabel = 'Primera';
    this._MatPaginatorIntl.lastPageLabel = 'Última';
    this._MatPaginatorIntl.nextPageLabel = 'Siguiente';
    this._MatPaginatorIntl.previousPageLabel = 'Anterior'; 
    // Configuracion del ordenamiento
  }


  getBooks() {
    this.bookService.paginate()
      .subscribe(bookPage => {
        this.bookPage = bookPage;
        this.dataSource.data = bookPage.content;
        this.totalElements = bookPage.totalElements;
        this.pageSize = bookPage.size; // Asignar los datos a dataSource
      })
  }


  // Este metodo se encarga de eliminar un libro
  deleteBook(book: Book) {
    if (confirm('¿Está seguro de eliminar este libro?')) {
      this.bookService.delete(book.id!)
        .subscribe(() => {
          this.getBooks();
        });
    }
  }
  

  paginateBooks(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;

    this.bookService.paginate(size, page)
      .subscribe(bookPage => {
        this.bookPage = bookPage;
        this.dataSource.data = bookPage.content;
        this.totalElements = bookPage.totalElements;
        this.pageSize = bookPage.size;
      })
  }


  // Este metodo se encarga de exportar a PDF
  downloadPDF() {
    const data = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(data!, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_libros.pdf`);
    });
  }


  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  


}

