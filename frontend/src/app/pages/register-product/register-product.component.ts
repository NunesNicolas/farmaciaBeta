import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../_forms/product/product.component'
import { ProductService, Product } from '../../_services/product.service';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-register-product',
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './register-product.component.html',
})
export class RegisterProductComponent  {
    product: Product = {
      id: 0,
      name: '',
      img: '',
      price: 0,
      description: '',
      category: '',
    };

  constructor(private productService: ProductService) {}

  registerProduct() {
    this.productService.registerProduct(this.product).subscribe(
      (response) => {
        console.log('Product registered successfully:', response);
      },
      (error) => {
        console.error('Error registering product:', error);
      }
    );
  }
}




