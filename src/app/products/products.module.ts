import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared.module";

import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductModule{ }
