export interface IproductType {
  id: string;
  type: number;
}

export interface IproductInterface {
  id: string;
  title: string;
  unit: string;
  cost: number;
  type: IproductInterface;
}
