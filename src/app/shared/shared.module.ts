import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";

import { AbstractTableComponent } from './abstract-table/abstract-table.component';
import { TemplateWithIdDirective } from './directives/template-with-id.directive';

@NgModule({
  declarations: [
    AbstractTableComponent,
    TemplateWithIdDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    AbstractTableComponent,
    TemplateWithIdDirective
  ]
})
export class SharedModule {}
