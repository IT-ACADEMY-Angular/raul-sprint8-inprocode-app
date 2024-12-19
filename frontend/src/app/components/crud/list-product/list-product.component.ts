import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'list-product-component',
  imports: [CommonModule, RouterLink, ProgressBarComponent],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit {
  listProducts: Product[] = []
  loading: boolean = false

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListProducts()
  }

  getListProducts() {
    this.loading = true;
    this.productService.getListProducts().subscribe((data: Product[]) => {
        this.listProducts = data;
        this.loading = false;
    })
  }

  deleteProduct(id: number) {
    this.loading = true;
    this.productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning('Producto eliminado correctamente!', 'Producto eliminado.');
    })
    
  }

}
