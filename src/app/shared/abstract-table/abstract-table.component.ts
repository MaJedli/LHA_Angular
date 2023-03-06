import { CdkColumnDef } from '@angular/cdk/table';
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
  @ContentChildren(MatColumnDef, { read: MatColumnDef }) columnDefs?: QueryList<MatColumnDef>;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

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
    if(!this.columnDefs) {
      return;
    }

    this.columnDefs.forEach((child: CdkColumnDef) => {
      this.table.addColumnDef(child);
      this.displayedColumns.push(child.name);
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
