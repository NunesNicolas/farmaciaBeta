import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formProduct } from '../../_forms/formProduct/formProduct.component'
import { ProductService, Product } from '../../_services/product.service';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-register-product',
  imports: [CommonModule, formProduct, HeaderComponent],
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

  onFormSubmit(formData: any) {
    // Map form data to product interface
    this.product = {
      id: 0,
      name: formData.name,
      img: formData.img ? formData.img : '',
      price: formData.price,
      description: formData.description,
      category: formData.category,
    };

    this.registerProduct();
  }

  registerProduct() {
    this.productService.registerProduct(this.product).subscribe(
      (response) => {
        console.log('Product registered successfully:', response);
        alert('Produto cadastrado com sucesso!');
      },
      (error) => {
        console.error('Error registering product:', error);
        alert('Erro ao cadastrar produto. Por favor, tente novamente.');
      }
    );
  }

  onFormCancel() {
    // Handle form cancellation
    console.log('Form cancelled');
  }
}




