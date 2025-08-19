import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../_services/product.service';
import { CardItemComponent } from '../../components/cardItem/card-item.component';
import { HttpTokenService } from '../../auth/http-token.service';

@Component({
  selector: 'app-showcase',
  imports: [CommonModule, HeaderComponent, CardItemComponent],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
})
export class ShowcaseComponent {
  errMessage!: string | null;
  user!: any | null;

  currentPage = 1;
  perPage = 10;
  lastPage = 1;
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private svc: HttpTokenService
  ) {}

  loadProducts(page: number = 1) {
  this.currentPage = page; // <-- garante que a página atual muda antes da requisição

  this.productService.getProducts(page, this.perPage).subscribe((res: any) => {
    console.log(res);
    this.products = res.data;

    this.currentPage = res.current_page;
    this.lastPage = res.last_page;
  });
}

  nextPage() {
    if (this.currentPage < this.lastPage) {
      this.loadProducts(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadProducts(this.currentPage - 1);
    }
  }

  getPageNumbers(): (number | -1)[] {
    const pages: (number | -1)[] = [];
    const maxVisiblePages = 5;
    
    if (this.lastPage <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= this.lastPage; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      // Calculate range around current page
      let start = Math.max(2, this.currentPage - 1);
      let end = Math.min(this.lastPage - 1, this.currentPage + 1);
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push(-1);
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < this.lastPage - 1) {
        pages.push(-1);
      }
      
      // Add last page
      pages.push(this.lastPage);
    }
    
    return pages;
  }

  ngOnInit(): void {
    this.loadProducts(1);
  }
}
