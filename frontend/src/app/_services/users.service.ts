import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:8000';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.getUser().pipe(
      catchError(() => of(null))
    ).subscribe(user => {
      if (user) {
        this.currentUserSubject.next(user);
      }
    });
  }

  login(credenciais: { email: string; password: string }): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true })
      .pipe(
        switchMap(() =>
          this.http.post(`${this.apiUrl}/login`, credenciais, {
            withCredentials: true,
          })
        ),
        tap((response: any) => {
          if (response.user) {
            this.currentUserSubject.next(response.user);
          }
        }),
        catchError((error) => {
          this.currentUserSubject.next(null);
          throw error;
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
      }),
      catchError((error) => {
        this.currentUserSubject.next(null);
        throw error;
      })
    );
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/user`, { withCredentials: true }).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}