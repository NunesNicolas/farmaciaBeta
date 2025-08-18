import { Component, Input } from '@angular/core';
import { ProductService, Product } from '../../_services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-card-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {
 @Input() product!: { id: number; name: string; price: number; img?: string };
}
