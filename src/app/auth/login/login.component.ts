import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Credentials } from '../shared/auth.model';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: Credentials = {
    email: '',
    password: ''
  };


  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }


  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.login(this.credentials)
      .subscribe(user => {
        this.snackBar.open(`Welcome ${user.firstName}`, 'Close', {
          duration: 10 * 1000,
          panelClass: ['warning'],
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        if (user.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard'])
          return;
        }
        else {
          this.router.navigate(['/'])
        }
      })
  }

}

