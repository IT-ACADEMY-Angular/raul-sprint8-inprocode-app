import { Component } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'list-product-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {
  listProducts: Product[] = [
    { id: 1, name: 'Raton inalámbrico', description: 'Ratón sin cable con pilas', price: 39.99, stock: 500},
    { id: 2, name: 'Teclado inalámbrico', description: 'Teclado mecánico sin cable y con bateria recargable', price: 79.99, stock: 200}
  ]
}
