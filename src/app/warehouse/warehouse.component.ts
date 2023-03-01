import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { Warehouse } from '../models/types';
import { WarehouseService } from './warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  warehouses: Warehouse[] = [];
  onDestroy$ = new Subject<void>();

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.warehouses = this.warehouseService.getWarehouses();
    this.warehouseService.warehouseUpdated$
      .pipe(
        takeUntil(this.onDestroy$),
        tap((warehouses) => (this.warehouses = warehouses))
      )
      .subscribe();
  }

  onElementRemoved(event: Warehouse) {
    this.warehouseService.removeWarehouse(event);
    this.warehouses = this.warehouseService.getWarehouses();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
