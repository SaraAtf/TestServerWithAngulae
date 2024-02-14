import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { productList } from './productList';

@Injectable({
  providedIn: 'root',
})
export class ProductStaticService {
  products: IProduct[] = [];
  constructor() {
    this.products = productList;
  }

  getAllProduct(): IProduct[] {
    return this.products;
  }

  getProductId(id: any) {
    return this.products.find((product) => product.id == id);
  }

  deleteProduct(id: any) {
    this.products = this.products.filter((product) => product.id != id);
    return this.products;
  }
  // add -- edit
}
