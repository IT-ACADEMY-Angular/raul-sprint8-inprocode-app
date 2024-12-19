import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../interfaces/product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ProgressBarComponent } from "../../../shared/progress-bar/progress-bar.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-edit-product-component',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ProgressBarComponent],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar '

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar ';
      this.getProduct(this.id)
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this.productService.getProduct(id).subscribe((data: Product) => {
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
    })
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
    }

    this.loading = true;

    if (this.id !== 0) {
      //EDITAR
      product.id = this.id;
      this.productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(`El producto ${product.name} fué actualizado correctamente`, 'Producto actualizado!')
        this.loading = false;
        this.router.navigate(['/'])
      })
    } else {
      //AGREGAR
      this.productService.saveProduct(product).subscribe(() => {
        this.toastr.success(`El producto ${product.name} fué registrado correctamente`, 'Producto registrado!')
        this.loading = false;
        this.router.navigate(['/'])
      })
    }


  }
}
