import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/iproduct';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURl: string = 'http://localhost:3005/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseURl);
  }

  getProductById(id: any) {
    return this.http.get(`${this.baseURl}/${id}`);
  }

  addNewProduct(product: any) {
    return this.http.post(this.baseURl, product);
  }
  editProduct(id: any, product: any) {
    return this.http.put(`${this.baseURl}/${id}`, product);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.baseURl}/${id}`);
  }
}
