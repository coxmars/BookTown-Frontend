import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './books/book-list/book-list.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { NewBookComponent } from './books/new-book/new-book.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    BookListComponent,
    NewBookComponent,
    EditBookComponent,
    AdminLayoutComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
