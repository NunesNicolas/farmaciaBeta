import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenService {

  constructor(private http: HttpClient) { }
  
  getCrsfToken(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true, observe: 'response' });
  }
}
