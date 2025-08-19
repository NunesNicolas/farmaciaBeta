import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenService {

  constructor(private http: HttpClient) { }
  
  getCrsfToken(): Observable<any> {
    return this.http.get<any>(`${API_URL}/sanctum/csrf-cookie`, { withCredentials: true, observe: 'response' });
  }
} 
