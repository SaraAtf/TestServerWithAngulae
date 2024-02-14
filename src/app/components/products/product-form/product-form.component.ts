import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productId: any;
  product: any;
  constructor(
    private productServices: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        console.log(this.productId);
      },
      error: () => {},
    });

    if (this.productId != 0) {
      this.productServices.getProductById(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          console.log(this.product);
        },
      });
    }
  }

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  });
  get getName() {
    return this.productForm.controls['name'];
  }
  get getPrice() {
    return this.productForm.controls['price'];
  }
  get getQuantity() {
    return this.productForm.controls['quantity'];
  }

  productOperation(e: any) {
    console.log('Operation Done');
    e.preventDefault();
    if (this.productId == 0) {
      console.log('From Zeroe');
      //add
      this.productServices.addNewProduct(this.productForm.value).subscribe({
        next: (data) => {
          console.log('From add : ', data);
        },
      });
    } else {
      console.log('From Else');
      this.productServices
        .editProduct(this.productId, this.productForm.value)
        .subscribe({
          next: (data) => {
            console.log('From edit', data);
          },
        });
      // edit
    }

    this.productServices.getAllProducts().subscribe();
    this.router.navigate(['/products']);
  }
}
