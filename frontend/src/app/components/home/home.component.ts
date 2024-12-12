import { Component } from '@angular/core';
import { ListProductComponent } from '../crud/list-product/list-product.component';

@Component({
  selector: 'home-component',
  imports: [ListProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}