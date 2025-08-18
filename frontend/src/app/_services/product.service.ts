import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { register } from 'module';

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

  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

   getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);

    
  }

  registerProduct(product: Product): Observable<Product> {
      return this.http.post<Product>(this.apiUrl, product);
    }
}

