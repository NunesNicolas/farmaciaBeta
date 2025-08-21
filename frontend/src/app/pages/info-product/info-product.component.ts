import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../_services/product.service';
import { CardItemComponent } from '../../components/cardItem/card-item.component';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-info-product',
  standalone: true,
  imports: [CommonModule, CardItemComponent, HeaderComponent],
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss']
})
export class InfoProductComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  isLoading = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (data) => {
          this.product = data;
          this.isLoading = false;
          if (this.product) {
            this.loadRelatedProducts(this.product.category, this.product.id);
          }
        },
        error: (err) => {
          alert('Produto não encontrado.');
          this.router.navigate(['/']);
          this.isLoading = false;
        }
      });
    } else {
      alert('Produto não encontrado.');
      this.router.navigate(['/']);
      this.isLoading = false;
    }
  }

  loadRelatedProducts(category: string, currentProductId: number) {
    this.productService.getProducts(1, 5, category).subscribe({
      next: (res: any) => {
        this.relatedProducts = res.data.filter((p: Product) => p.id !== currentProductId);
      }
    });
  }

  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }

  editProduct(): void {
    if (this.product) {
      this.router.navigate(['/product', this.product.id, 'edit'], { state: { product: this.product } });
    }
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/product', productId]).then(() => {
      window.location.reload();
    });
  }
}