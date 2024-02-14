import { Component, OnInit } from '@angular/core';
import { ProductStaticService } from 'src/app/services/product-static.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any;
  constructor(public _productServices: ProductService) {}

  ngOnInit(): void {
    this._productServices.getAllProducts().subscribe({
      next: (data) => (this.products = data),
      error: (error) => console.log(error),
    });
  }

  deleteProductHandler(id: any) {
    this._productServices.deleteProduct(id).subscribe({
      next: (data) => {
        this.products = this.products.filter(
          (product: any) => product.id != id
        );
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
