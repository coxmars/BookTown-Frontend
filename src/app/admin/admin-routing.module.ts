import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list.component';
import { NewBookComponent } from './books/new-book/new-book.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Aqui se definen las rutas de la aplicación
const routes: Routes = [
  // Se hace esto para que las rutas sean hijas de la ruta admin, es decir, 
  //que se carguen dentro del componente AdminLayoutComponent, que es el que tiene el router-outlet y mostrará las rutas hijas
  // En otras palabras, para que la barra navegacion se mantenga en todas las rutas hijas, se hace lo mismo si se tuviera que tener una para sitio publico
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path:'books',
        component:BookListComponent
      },
      {
        path:'books/new',
        component: NewBookComponent
      },
      {
        path:'books/update/:id',
        component: EditBookComponent
      },
      {
        path:'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

// Usamos forChild() porque este es un módulo de rutas secundario
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
