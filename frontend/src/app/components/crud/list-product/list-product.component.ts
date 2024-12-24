import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'list-product-component',
  imports: [CommonModule, RouterLink, ProgressBarComponent, CapitalizePipe],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit {
  listProducts: Product[] = []
  loading: boolean = false
  tittle: string = 'ALMACÉN WILD TIGER';
  msgNoItems: string = 'No hay productos en el almacén, anímate y compra alguno!'

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
      this.toastr.warning(`Producto eliminado correctamente!`, 'Producto eliminado.');
    })
  }

  downloadCSV() {
    const csvData = this.convertToCSV(this.listProducts);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'productos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertToCSV(products: Product[]): string {
    const headers = ['Nombre', 'Características', 'Precio', 'Stock'];
    const rows = products.map(product => [
      product.name,
      product.description,
      product.price,
      product.stock
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return csvContent;
  }
}
