import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { formProduct } from '../../_forms/formProduct/formProduct.component';
import { ProductService, Product } from '../../_services/product.service';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, formProduct, HeaderComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
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
  ngOnInit() {
    this.product = history.state['product'];
  }
  onFormSubmit(formData: any) {
    const productData = {
      id: this.product.id,
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description || '',
      category: formData.category,
      img: formData.img || ''
    };

    this.editProduct(productData);
  }

  editProduct(productData: Product) {
    this.productService.updateProduct(productData.id, productData).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        alert('Produto atualizado com sucesso!');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error updating product:', error);
        
        let errorMessage = 'Erro ao atualizar produto. ';
        
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

  onFormCancel() {
    console.log('Edit cancelled');
    this.router.navigate(['/']);
  }
}
