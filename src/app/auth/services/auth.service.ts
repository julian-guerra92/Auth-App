import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthRepsonse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: Usuario;

  get user() {
    return { ...this._user }
  }

  constructor(private http: HttpClient) { }

  //Se puede crear un pipe personlaizado para los servicios de register y login. Son los mismos.

  register(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = { name, email, password };
    return this.http.post<AuthRepsonse>(url, body)
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.token!);
        }),
        map(resp => resp.ok),
        catchError(error => of(error.error.msg))
      );
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };
    return this.http.post<AuthRepsonse>(url, body)
      .pipe(
        tap(resp => {
          console.log(resp);
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
          };
        }),
        map(resp => resp.ok),
        catchError(error => of(error.error.msg))
      );
  }

  tokenValidator() {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')
    return this.http.get<AuthRepsonse>(url, { headers })
      .pipe(
        map(resp => {
          console.log(this._user);
          localStorage.setItem('token', resp.token!);
          this._user = {
            uid: resp.uid!,
            name: resp.name!,
            email: resp.email!
          }
          return resp.ok;
        }),
        catchError(error => of(false))
      );
  }

  logout() {
    localStorage.clear();
  }

}
