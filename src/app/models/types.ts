export type Product = {
  id: string;
  name: string;
  description: string;
  lastUpdate: string;
  isAvailable: boolean;
}

export type Warehouse = {
  id: string;
  name: string;
  score: number;
  phone: string;
}

export type ValidData = {
  [key: string]: string | number | boolean | Date;
}
