import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../_services/product.service';
import { CardItemComponent } from '../../components/cardItem/card-item.component';
import { HttpTokenService } from '../../auth/http-token.service';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, CardItemComponent],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
})
export class ShowcaseComponent implements OnInit {
  errMessage!: string | null;
  user!: any | null;

  isLoading = true;
  currentPage = 1;
  perPage = 8;
  lastPage = 1;
  products: Product[] = [];

  selectedCategory: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  categories: string[] = [];

  isFilterModalOpen = false;

  constructor(
    private productService: ProductService,
    private svc: HttpTokenService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts(1);
  }

  loadProducts(page: number = 1) {
    this.isLoading = true;
    this.errMessage = null;
    this.currentPage = page;

    this.productService.getProducts(
      page, 
      this.perPage,
      this.selectedCategory || undefined,
      this.minPrice || undefined,
      this.maxPrice || undefined
    ).subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.currentPage = res.current_page;
        this.lastPage = res.last_page;
        this.isLoading = false;
        
        if (this.products.length === 0) {
          this.errMessage = 'Nenhum produto encontrado com os filtros aplicados.';
        }
      },
      error: (err) => {
        this.errMessage = 'Não foi possível carregar os produtos. Por favor, tente novamente mais tarde.';
        this.isLoading = false;
        this.products = [];
      }
    });
  }

  loadCategories() {
    this.productService.getProducts(1, 100).subscribe({
      next: (res: any) => {
        const uniqueCategories = [...new Set(res.data.map((product: Product) => product.category))];
        this.categories = uniqueCategories as string[];
      }
    });
  }

  applyFilters() {
    this.currentPage = 1;
    this.loadProducts(1);
  }

  clearFilters() {
    this.selectedCategory = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.loadProducts(1);
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
      for (let i = 1; i <= this.lastPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, this.currentPage - 1);
      let end = Math.min(this.lastPage - 1, this.currentPage + 1);
      
      if (start > 2) {
        pages.push(-1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < this.lastPage - 1) {
        pages.push(-1);
      }
      
      pages.push(this.lastPage);
    }
    
    return pages;
  }

  openFilterModal() {
    this.isFilterModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeFilterModal() {
    this.isFilterModalOpen = false;
    document.body.style.overflow = '';
  }

  applyFiltersAndClose() {
    this.applyFilters();
    this.closeFilterModal();
  }

  clearFiltersAndClose() {
    this.clearFilters();
    this.closeFilterModal();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (this.isFilterModalOpen) {
      this.closeFilterModal();
    }
  }
}