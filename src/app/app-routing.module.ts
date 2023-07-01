import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Aqui se definen las rutas de la aplicación
const routes: Routes = [
  {
    // Aqui aplicamos lazy loading
    path:'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    // Aqui aplicamos lazy loading
    path:'',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
