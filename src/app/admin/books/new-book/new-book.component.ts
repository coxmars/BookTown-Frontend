import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../shared/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})

export class NewBookComponent {

  errors?: string[]; // Esto es para mostrar los errores que nos devuelve el servidor
  /*
  uploadSuccess: boolean = false;
  successMessage: string = '';
  */

  // Estas son las validaciones que se aplican a cada campo del formulario, este es un formulario Reactivo
  form: FormGroup = this.formBuilder.group({
    title: [, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    slug: [, [Validators.required, Validators.pattern('[a-z0-9-]+')]],
    price: [, [Validators.required, Validators.min(0)]],
    desc: [, [Validators.required,]],
    coverPath: [, [Validators.required]],
    filePath: [, [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router // Esto nos sirve para navegar a otra ruta manualmente
  ) { }


  controlHasError(control: string, error: string): boolean {
    return this.form.controls[control].hasError(error) && this.form.controls[control].touched;
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


  // Este método se ejecuta cuando se envía el formulario con (ngSubmit)="create()", si fuera otro nombre de método, se pondría (ngSubmit)="otroNombre()"
  create() {
    // Validamos que el formulario sea válido antes de enviarlo al servidor
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Enviamos el formulario al servidor
    this.bookService.create(this.form.value)
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
