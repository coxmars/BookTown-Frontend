import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../shared/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})

export class EditBookComponent implements OnInit {

  errors?: string[]; // Esto es para mostrar los errores que nos devuelve el servidor

  // Le decimos que puede ser nulo porque al principio no tenemos el libro, pero luego lo obtenemos del servidor
  form?: FormGroup;

  bookId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router, // Esto nos sirve para navegar a otra ruta manualmente
    private activatedRoute: ActivatedRoute // Nos sirve para obtener el parámetro de la ruta (id) en este caso
  ) { }


  // Este metodo se encarga de obtener el libro del servidor y rellenar el formulario con los datos del libro
  ngOnInit(): void {
    this.bookId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!); // Obtenemos el parámetro (id) y le ponemos el signo de exclamación para que no nos de error de que puede ser nulo
    this.bookService.get(this.bookId)
      .subscribe(book => {
        this.form = this.formBuilder.group({
          title: [book.title, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
          slug: [book.slug, [Validators.required, Validators.pattern('[a-z0-9-]+')]],
          price: [book.price, [Validators.required, Validators.min(0)]],
          desc: [book.desc, [Validators.required,]],
          coverPath: [book.coverPath, [Validators.required]],
          filePath: [book.filePath, [Validators.required]]
        });
      });
  }


  // Usamos el signo de interrogación porque this.form no va a ser nulo, pero Typescript no lo sabe
  controlHasError(control: string, error: string): boolean {
    return this.form!.controls[control].hasError(error) && this.form!.controls[control].touched;
  }


  generateSlug() {
    const slug = this.form!.controls['title'].value
    .toLowerCase() 
    .replace(/\s+/g, '-') // Replace spaces with - 
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars 
    .replace(/\-\-+/g, '-') // Replace multiple - with single - 
    .replace(/^-+/, '') // Trim - from start of text 
    .replace(/-+$/, ''); // Trim - from end of text
    this.form!.controls['slug'].setValue(slug);
  }


  // Este método se ejecuta cuando se selecciona un archivo en el input de tipo file
  uploadFile(event: any, control: string) {
    const filename = event.target.files[0];

    if (filename) {
      const formData = new FormData();
      formData.append('filename', filename);

      this.bookService.uploadFile(formData)
        .subscribe(response => {
          console.log('response', response.path);
          // Asignar el valor de response.path al control coverPath del formulario
          this.form!.controls[control].setValue(response.path);
          /*
          this.uploadSuccess = true;
          this.successMessage = 'El archivo ha sido subido: ' + response.path;
          */
        });
    }

  }


  // Este método se ejecuta cuando se envía el formulario con (ngSubmit)="update()", si fuera otro nombre de método, se pondría (ngSubmit)="otroNombre()"
  update() {
    // Validamos que el formulario sea válido antes de enviarlo al servidor
    if (this.form!.invalid) {
      this.form!.markAllAsTouched();
      return;
    }

    // Enviamos el formulario al servidor
    this.bookService.update(this.bookId!, this.form!.value)
      .subscribe({
        next: (book) => {
          this.router.navigate(['/admin/books']); // Con esto redirigimos a la ruta /books
        },
        error: (error) => {
          this.errors = error.error.errors;
        }
      });
  }

}
