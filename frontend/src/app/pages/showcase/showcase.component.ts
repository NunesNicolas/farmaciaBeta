import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../_services/product.service';
import { CardItemComponent } from '../../components/cardItem/card-item.component';
import {HttpTokenService} from '../../auth/http-token.service';


@Component({
  selector: 'app-showcase',
  imports: [CommonModule, HeaderComponent, CardItemComponent],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent {
  errMessage!: string|null;
  user!: any|null;
  
  
  products: Product[] = [];

  constructor(private productService: ProductService, private svc: HttpTokenService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

  }
}
