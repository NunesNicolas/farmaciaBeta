import { Component, EventEmitter, Output, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../_services/product.service';

@Component({
  selector: 'app-formproduct',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formProduct.component.html',
  styleUrl: './formProduct.component.scss'
})
export class formProduct implements OnInit, OnChanges {
  @Input() productData: Product | null = null;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();
  
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

  ngOnInit() {
    // Se productData for passado via @Input(), usar esses dados
    if (this.productData) {
      this.populateForm();
    }
    // Caso contrário, verificar history.state (para casos de navegação)
    else if (history.state && history.state['product']) {
      this.productData = history.state['product'];
      this.populateForm();
    }
  }

  ngOnChanges() {
    // Se productData mudar após o init, atualizar o formulário
    if (this.productData) {
      this.populateForm();
    }
  }

  populateForm() {
    if (this.productData) {
      this.productForm.patchValue({
        name: this.productData.name || '',
        price: this.productData.price || 0,
        description: this.productData.description || '',
        category: this.productData.category || '',
        img: this.productData.img || null
      });
      
      if (this.productData.img) {
        this.previewUrl = this.productData.img;
      }
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isLoading = true;
      
      const formData = this.productForm.value;
      
      this.formSubmit.emit(formData);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione uma imagem válida.');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Compressão simples no frontend
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Dimensões máximas para reduzir tamanho
          const maxWidth = 600;
          const maxHeight = 450;
          
          let { width, height } = img;
          
          // Redimensionar se necessário
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Desenhar imagem redimensionada
          ctx!.drawImage(img, 0, 0, width, height);
          
          // Converter para base64 com qualidade reduzida
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
          
          // Verificar tamanho final
          if (compressedDataUrl.length > 500000) { // ~500KB
            alert('A imagem comprimida ainda é muito grande. Tente uma imagem menor.');
            return;
          }
          
          this.previewUrl = compressedDataUrl;
          
          // Atualizar formulário com imagem comprimida
          this.productForm.patchValue({
            img: compressedDataUrl
          });
        };
        
        img.onerror = () => {
          alert('Erro ao processar a imagem. Tente outra imagem.');
        };
        
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
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
    this.formCancel.emit();
  }
}
