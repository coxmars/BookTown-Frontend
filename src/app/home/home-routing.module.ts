import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { IndexComponent } from './index/index.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

// Aqui se definen las rutas de la aplicación
const routes: Routes = [
  // Se hace esto para que las rutas sean hijas de la ruta admin, es decir, 
  //que se carguen dentro del componente AdminLayoutComponent, que es el que tiene el router-outlet y mostrará las rutas hijas
  // En otras palabras, para que la barra navegacion se mantenga en todas las rutas hijas, se hace lo mismo si se tuviera que tener una para sitio publico
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path:'',
        component: IndexComponent
      },
      {
        path:'books',
        component: BooksComponent
      },
      {
        path:'books/:slug',
        component: BookDetailComponent
      },
      {
        path:'cart',
        component: CartComponent
      },
      {
        path:'wishlist',
        component: WishlistComponent
      }
    ]
  }
];

// Usamos forChild() porque este es un módulo de rutas secundario
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
