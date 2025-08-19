import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: Product = {
    id: 0,
    name: '',
    img: '',
    price: 0,
    description: '',
    category: '',
  };

  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = this.getCookie('XSRF-TOKEN');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': token || ''
    });
  }

  private getCookie(name: string): string | null {
    const nameLenPlus = name.length + 1;
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => cookie.substring(0, nameLenPlus) === `${name}=`)
      .map(cookie => decodeURIComponent(cookie.substring(nameLenPlus)))[0] || null;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, {
      withCredentials: true
    });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, {
      withCredentials: true
    });
  }

  registerProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, {
      headers: this.getHeaders(),
      withCredentials: true
    });
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, {
      headers: this.getHeaders(),
      withCredentials: true
    });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
      withCredentials: true
    });
  }
}

