import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { Product } from '../models/types';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private onDestroy$ = new Subject<void>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.productService.productsUpdated$
      .pipe(
        takeUntil(this.onDestroy$),
        tap((products) => (this.products = products))
      )
      .subscribe();
  }

  onElementRemoved(event: Product) {
    this.productService.removeProduct(event);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
