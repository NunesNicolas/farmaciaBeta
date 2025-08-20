import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

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

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getProducts(page: number = 1, perPage: number = 10, category?: string, minPrice?: number, maxPrice?: number): Observable<any> {
    let url = `${this.apiUrl}?page=${page}&perPage=${perPage}`;
    
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    
    if (minPrice !== undefined && minPrice !== null) {
      url += `&min_price=${minPrice}`;
    }
    
    if (maxPrice !== undefined && maxPrice !== null) {
      url += `&max_price=${maxPrice}`;
    }
    
    return this.http.get<any>(url, 
      this.authService.getBasicOptions()
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, 
      this.authService.getBasicOptions()
    );
  }

  registerProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, 
      this.authService.getAuthOptions()
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, 
      this.authService.getAuthOptions()
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, 
      this.authService.getAuthOptions()
    );
  }
}

