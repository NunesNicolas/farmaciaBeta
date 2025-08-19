import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  onFormSubmit(formData: any) {
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description || '',
      category: formData.category,
      img: formData.img || ''
    };

    this.registerProduct(productData);
  }

  registerProduct(productData: any) {
    this.productService.registerProduct(productData).subscribe(
      (response) => {
        console.log('Product registered successfully:', response);
        alert('Produto cadastrado com sucesso!');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error registering product:', error);
        
        let errorMessage = 'Erro ao cadastrar produto. ';
        
        if (error.status === 422) {
          const validationErrors = error.error.errors;
          if (validationErrors) {
            const messages = Object.values(validationErrors).flat();
            errorMessage += messages.join('. ');
          } else {
            errorMessage += 'Por favor, verifique os dados informados.';
          }
        } else if (error.status === 0) {
          errorMessage += 'Verifique sua conexão com o servidor.';
        } else if (error.status >= 500) {
          errorMessage += 'Erro no servidor. Tente novamente mais tarde.';
        } else {
          errorMessage += error.error.message || 'Tente novamente.';
        }
        
        alert(errorMessage);
      }
    );
  }

  resetForm() {
    this.product = {
      id: 0,
      name: '',
      img: '',
      price: 0,
      description: '',
      category: '',
    };
  }

  onFormCancel() {
    this.resetForm();
    console.log('Form cancelled');
  }
}
