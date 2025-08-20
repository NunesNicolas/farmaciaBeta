import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getAuthHeaders(): HttpHeaders {
    const token = this.getCookie('XSRF-TOKEN');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': token || ''
    });
  }

  getAuthOptions() {
    return {
      headers: this.getAuthHeaders(),
      withCredentials: true
    };
  }

  
  getBasicOptions() {
    return {
      withCredentials: true
    };
  }


  private getCookie(name: string): string | null {
    const nameLenPlus = name.length + 1;
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => cookie.substring(0, nameLenPlus) === `${name}=`)
      .map(cookie => decodeURIComponent(cookie.substring(nameLenPlus)))[0] || null;
  }


  isAuthenticated(): boolean {
    return !!this.getCookie('XSRF-TOKEN');
  }
}
