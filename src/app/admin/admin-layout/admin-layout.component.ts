import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/shared/auth.model';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})

export class AdminLayoutComponent implements OnInit {

  currentUser?: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.authService.getAuthenticationState()
      .subscribe(user => this.currentUser = user);
  }

  // It is used to show the user name in the navigation bar
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
