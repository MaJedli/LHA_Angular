import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatTable, MatColumnDef, MatCellDef, MatHeaderCellDef, MatFooterCellDef } from '@angular/material/table';
import { TemplateWithIdDirective } from '../directives/template-with-id.directive';

type AcceptableInputTypes = string | number | boolean | Date;
type SingleDateElement = { [key: string]: AcceptableInputTypes };

@Component({
  selector: 'app-abstract-table',
  templateUrl: './abstract-table.component.html',
  styleUrls: ['./abstract-table.component.scss'],
})
export class AbstractTableComponent implements OnInit, AfterContentInit, AfterViewInit {
  @Input() data: SingleDateElement[] = [];
  @Output() elementRemoved = new EventEmitter<any>();
  @Output() elementEdited = new EventEmitter<SingleDateElement>();
  @ContentChildren(TemplateWithIdDirective)
  templates!: QueryList<TemplateWithIdDirective>;
  @ViewChild(MatTable) table!: MatTable<any>;

  // @ViewChild(MatColumnDef, { static: true }) columnDef!: MatColumnDef;
  // @ViewChild(MatCellDef, { static: true }) cellDef!: MatCellDef;
  // @ViewChild(MatHeaderCellDef, { static: true }) headerCellDef!: MatHeaderCellDef;
  // @ViewChild(MatFooterCellDef, { static: true }) footerCellDef!: MatFooterCellDef;

  // ngOnInit() {
  //   if (this.table && this.columnDef) {
  //     this.columnDef.cell       = this.cellDef;
  //     this.columnDef.headerCell = this.headerCellDef;
  //     this.columnDef.footerCell = this.footerCellDef;
  //     this.table.addColumnDef(this.columnDef);
  //   }
  // }

  prependTemplate!: TemplateRef<TemplateWithIdDirective>;
  appendTemplate!: TemplateRef<TemplateWithIdDirective>;

  columns: string[] = [];
  dataSource: { [key: string]: string | number | boolean | Date }[] = [];
  displayedColumns: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.columns = Object.keys(this.data[0]);
    this.dataSource = this.data;
    this.displayedColumns = this.columns.concat(['actions']);
  }

  ngAfterContentInit() {
    this.templates.forEach((child: TemplateWithIdDirective) => {
      console.log('CHILD');
      console.log(child);

      switch (child.id) {
        case 'prepend': {
          this.prependTemplate = child.template;
          break;
        }
        case 'append': {
          this.appendTemplate = child.template;
          break;
        }
      }
    });

  }

  ngAfterViewInit() {
  }

  editRow(row: SingleDateElement) {
    this.elementEdited.emit(row);
  }

  removeRow(row: SingleDateElement) {
    this.elementRemoved.emit(row);
    this.table.renderRows();
  }
}
