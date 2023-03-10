import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  // @Input() product?: Product;
  product: Product | undefined;
  // productForm: FormGroup | undefined;
  editForm: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private fb: FormBuilder
  ) {}
  // productForm: FormGroup;
  ngOnInit(): void {
    this.getProduct();
    this.editForm = this.fb.group({
      name: [
        this.product?.name,
        [Validators.required, Validators.maxLength(55)],
      ],
      type: [this.product?.type, [Validators.required, Validators.maxLength(55)]],
      description: [this.product?.description, [Validators.required, Validators.maxLength(55)]],
      color: [this.product?.color, [Validators.required, Validators.maxLength(55)]],
      price: [this.product?.price, [Validators.required, Validators.min(0)]],
      // stackDetails: this.fb.group({
      //   stack: [''],
      //   experience: [''],
      // }),
      // address: this.fb.group({
      //   country: [''],
      //   city: [''],
      // }),
    });
    // this.productForm = new FormGroup({
    //   name: new FormControl(this.product?.name, [
    //     Validators.required,
    //     Validators.maxLength(55),
    //   ]),
    //   type: new FormControl(this.product?.type, [
    //     Validators.required,
    //     Validators.maxLength(55),
    //   ]),
    //   color: new FormControl(this.product?.color, [
    //     Validators.required,
    //     Validators.maxLength(55),
    //   ]),
    //   description: new FormControl(this.product?.description, [
    //     Validators.required,
    //     Validators.maxLength(55),
    //   ]),
    //   price: new FormControl(this.product?.price, [
    //     Validators.required,
    //     Validators.min(0),
    //   ]),
    // });
  }

  get name() {
    return this.editForm?.get('name');
  }

  get type() {
    return this.editForm?.get('type');
  }
  get color() {
    return this.editForm?.get('color');
  }

  get description() {
    return this.editForm?.get('description');
  }
  get price() {
    return this.editForm?.get('price');
  }

  getProduct(): void {
    const sku = this.route.snapshot.paramMap.get('sku')!;
    this.product =this.productService
      .getProduct(sku)
      // .subscribe((product) => (this.product = product));
  }
  update(): void {
    if (this.product) {
      
      this.productService.updateProduct(this.product);
      // .subscribe(() =>
      this.goBack();
      // );
    }
  }
  goBack(): void {
    this.location.back();
    
  }
  goToProductList(): void {
    
    this.location.go('/product-list')
  }
}
