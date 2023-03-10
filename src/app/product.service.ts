import { Product } from './product';
// import * as PRODUCTS from '../../assets/products.json';
import PRODUCTS from '../assets/products.json'
import { Injectable } from '@angular/core';

// import { map } from 'rxjs/operators';

console.log('localitems', sessionStorage.getItem('products'))
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[];

  constructor() {

    if (sessionStorage.getItem('products') == null){
      
    sessionStorage.setItem('products', JSON.stringify(PRODUCTS));}
 
    const storageVal = sessionStorage.getItem('products')!;
    
     this.products = <Product[]>JSON.parse(storageVal);
  }

  ngOnInit() {

    
  }
  getProducts(): Product[] {
    console.log('products in serve.getprods()', this.products)
    return this.products;
  }


  getProduct(sku: string) {
    const product = this.products.find((item) => item.sku === sku);
 
    return product 
  }

  deleteProduct(sku: string): void {

    console.log('sku',sku);
    console.log('products in serve.deletProd()', this.products);
    this.products = this.products.filter((prod=> prod.sku != sku)); 
    console.log('products after serve.delprod()', this.products);
    console.log('localitems', sessionStorage.getItem('products'));
    sessionStorage.setItem('products', JSON.stringify(this.products));
    console.log('localitems', sessionStorage.getItem('products'));
  }
  
  updateProduct(product: Product): void {
    console.log('products in serve.update()', this.products);
    var foundIndex = this.products.findIndex((x) => x.id == product.id);
    this.products[foundIndex] = product;
    console.log('products after serve.update()', this.products);
    console.log('localitems', sessionStorage.getItem('products'));
     sessionStorage.setItem('products', JSON.stringify(this.products));
     console.log('localitems', sessionStorage.getItem('products'));
  }

}

