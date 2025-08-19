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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe(data => {
        this.product = data;
      });
    } else {
      alert('Produto não encontrado.');
      window.history.back();
    }
  }

  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }

  editProduct(): void {
    this.router.navigate(['/product', this.product.id, 'edit'], { state: { product: this.product } });
  }
}
