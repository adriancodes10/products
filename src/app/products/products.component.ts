import { Component } from '@angular/core';


import { ProductService } from '../product.service';

import { Product } from '../product'
import { DecimalPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {

  products: Product[] = [];
  pageOfProducts?: Array<any>;
  loading = false;
  colorChoices: string[]= ['All'];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loading = true;
    this.getProducts();
    this.getColors();
    this.loading = false;
  }
  onChangePage(pageOfProducts: Array<any>) {
    this.pageOfProducts = pageOfProducts;
  }
  public selectedColor:string = 'All';

  getColors() {

    this.products.forEach((prod) =>
      this.colorChoices.includes(prod.color)? null:this.colorChoices.push(prod.color));
  }


  getProducts(): void {
      console.log('products in prod.getprods()', this.products);
    this.products = this.productService
      .getProducts()
        console.log('products after prodgetprods.update()', this.products);
     
  }

  delete(sku: string): void {
      console.log('products in prod.del()', this.products);
      this.productService.deleteProduct(sku);
    this.products = this.products.filter(p => p.sku !== sku);
      console.log('products in serve.del()', this.products);
  }


  update(product: Product): void {
    if (!product) {return;}
      console.log('products in prod.update()', this.products);
    this.productService.updateProduct(product);
      console.log('products after prod.update()', this.products);

  }

  filterByColor(color: string):void {
    if (color !== 'All'){
      this.products = this.productService.getProducts();
      this.products = this.products.filter(p=> p.color == color);
    } else {
      this.products =this.productService.getProducts();
    }
  }



}
