import { Component } from '@angular/core';
import { ListProductComponent } from '../crud/list-product/list-product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home-component',
  imports: [ListProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}