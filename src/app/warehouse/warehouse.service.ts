import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Warehouse } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  warehouseUpdated$ = new Subject<Warehouse[]>();
  warehouses: Warehouse[] = [
    {
      id: '1',
      name: 'Name1',
      score: 10,
      phone: '11111',
    },
    {
      id: '2',
      name: 'Name2',
      score: 20,
      phone: '2222',
    },
    {
      id: '3',
      name: 'Name3',
      score: 30,
      phone: '33333',
    },
    {
      id: '4',
      name: 'Name4',
      score: 40,
      phone: '44444',
    },
  ];

  constructor() { }

  getWarehouses() {
    return this.warehouses;
  }

  addWarehouse(product: Omit<Warehouse, 'id'>) {
    const newProduct = {...product, ...{id: crypto.randomUUID()}};
    this.warehouses.push(newProduct);
    this.warehouseUpdated$.next(this.warehouses);
  }

  updateWarehouse(warehouse: Warehouse) {
    const index  = this.findWarehouseIndexById(warehouse.id);
    if (index < 0) return;

    this.warehouses[index] = warehouse;
    this.warehouseUpdated$.next(this.warehouses);
  }

  removeWarehouse(warehouse: Warehouse) {
    const index = this.findWarehouseIndexById(warehouse.id);
    if (index < 0) return;

    this.warehouses.splice(index, 1);
    this.warehouseUpdated$.next(this.warehouses);
  }

  findWarehouseIndexById(id: string) {
    return this.warehouses.findIndex((warehouse) => warehouse.id === id);
  }
}
