import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[templateId]'
})
export class TemplateWithIdDirective {
  @Input('templateId') id!: string;

  constructor(public template: TemplateRef<any>) { }
}
