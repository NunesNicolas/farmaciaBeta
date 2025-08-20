import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../_services/product.service';
import { CardItemComponent } from '../../components/cardItem/card-item.component';
import { HttpTokenService } from '../../auth/http-token.service';

@Component({
  selector: 'app-showcase',
  imports: [CommonModule, FormsModule, HeaderComponent, CardItemComponent],
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

  selectedCategory: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  categories: string[] = [];

  isFilterModalOpen = false;

  constructor(
    private productService: ProductService,
    private svc: HttpTokenService
  ) {}

  loadProducts(page: number = 1) {
    this.currentPage = page;

    this.productService.getProducts(
      page, 
      this.perPage,
      this.selectedCategory || undefined,
      this.minPrice || undefined,
      this.maxPrice || undefined
    ).subscribe((res: any) => {
      this.products = res.data;
      this.currentPage = res.current_page;
      this.lastPage = res.last_page;
    });
  }

  loadCategories() {
    this.productService.getProducts(1, 100).subscribe((res: any) => {
      const uniqueCategories = [...new Set(res.data.map((product: Product) => product.category))];
      this.categories = uniqueCategories as string[];
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

  // Modal methods
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

  // Close modal on ESC key
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (this.isFilterModalOpen) {
      this.closeFilterModal();
    }
  }

  ngOnInit(): void {
    this.loadProducts(1);
  }
}
