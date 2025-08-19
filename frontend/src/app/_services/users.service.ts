import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(credenciais: { email: string; password: string }): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true })
      .pipe(
        switchMap(() =>
          this.http.post(`${this.apiUrl}/login`, credenciais, {
            withCredentials: true,
          })
        )
      );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/user`, { withCredentials: true });
  }
}
