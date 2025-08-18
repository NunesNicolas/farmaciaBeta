import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  productForm: FormGroup;
  isLoading = false;
  previewUrl: string | null = null;
  showSuccessMessage = false;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.maxLength(500)]],
      category: ['', Validators.required],
      img: [null]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Product data:', this.productForm.value);
        this.isLoading = false;
        this.showSuccessMessage = true;
        
        // Reset form after 3 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.productForm.reset();
          this.previewUrl = null;
        }, 3000);
      }, 1500);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione uma imagem válida.');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      
      // Update form control
      this.productForm.patchValue({
        img: file
      });
    }
  }

  removeImage() {
    this.previewUrl = null;
    this.productForm.patchValue({
      img: null
    });
  }

  onCancel() {
    this.productForm.reset();
    this.previewUrl = null;
    this.showSuccessMessage = false;
  }
}
