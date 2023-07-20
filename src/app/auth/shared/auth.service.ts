import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Credentials, User } from './auth.model';
import { map, mergeMap, Observable, ReplaySubject, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private current?: User
  private authenticationState = new ReplaySubject<User>(1)
  private accountCache$?: Observable<User>

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    // Each time we refresh the app we lost the current user so we use this to get it back
    if (this.isAuthenticated()) {
      this.getMyAccount().subscribe();
    }
  }

  login(creds: Credentials): Observable<User> {
    return this.getToken(creds).pipe(mergeMap(() => this.getMyAccount()));
  }

  getToken(creds: Credentials): Observable<any> {
    return this.http.post(`${environment.apiBase}/authenticate`, creds, {
      observe: 'response'
    })
      .pipe(map((response: HttpResponse<any>) => {
        //const headers = response.headers;
        const body = response.body;
        const bearerToken = body.token;
        const token = bearerToken?.replace('Bearer ', '');
        this.localStorageService.store('token', token);
        return body;
      }))
  }

  getMyAccount(): Observable<User> {
    if (!this.accountCache$) {
      this.accountCache$ = this.http.get<User>(`${environment.apiBase}/accounts/me`)
        .pipe(
          tap((user) => {
            this.current = user;
            this.authenticationState.next(this.current);
            return this.current;
          }),
          shareReplay()
        );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return !!this.localStorageService.retrieve('token');
  }

  getAuthenticationState(): Observable<User> {
    return this.authenticationState.asObservable();
  }

  isAdmin(): boolean {
    return this.current?.role == 'ADMIN';
  }

  logout() {
    this.localStorageService.clear('token');
    this.current = undefined;
    this.accountCache$ = undefined;
  }

  signup(user: User) {
    return this.http.post(`${environment.apiBase}/accounts/signup`, user);
  }

}

