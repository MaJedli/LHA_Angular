import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared.module";
import { WarehouseComponent } from "./warehouse.component";

@NgModule({
  declarations: [
    WarehouseComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    WarehouseComponent
  ]
})
export class WarehouseModule{ }
