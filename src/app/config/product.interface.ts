export interface Product {
    productId:number;
    mkt: number;
    name: string;
    count:number;
    price : number;
    active: boolean;
  }

export interface DropdownItemBool {
  label: string;
  value: boolean;
}
export interface DropdownItemString{
  label: string;
  value: string;
}