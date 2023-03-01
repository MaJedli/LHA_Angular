import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsUpdated$ = new Subject<Product[]>();
  products: Product[] = [
    {
      id: '1',
      name: 'Name1',
      description: 'description1',
      lastUpdate: '1111',
      isAvailable: true,
    },
    {
      id: '2',
      name: 'Name2',
      description: 'description2',
      lastUpdate: '2222',
      isAvailable: true,
    },
    {
      id: '3',
      name: 'Name3',
      description: 'description3',
      lastUpdate: '3333',
      isAvailable: true,
    },
    {
      id: '4',
      name: 'Name4',
      description: 'description4',
      lastUpdate: '4444',
      isAvailable: true,
    },
  ];

  constructor() { }

  getProducts() {
    // of();
    return this.products;
  }

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct = {...product, ...{id: crypto.randomUUID()}};
    this.products.push(newProduct);
    this.productsUpdated$.next(this.products);
  }

  updateProduct(product: Product) {
    const index  = this.findProductIndexById(product.id);
    if (index < 0) return;

    this.products[index] = product;
    this.productsUpdated$.next(this.products);
  }

  removeProduct(product: Product) {
    const index = this.findProductIndexById(product.id);
    if (index < 0) return;

    this.products.splice(index, 1);
    this.productsUpdated$.next(this.products);
  }

  findProductIndexById(id: string) {
    return this.products.findIndex((product) => product.id === id);
  }
}
