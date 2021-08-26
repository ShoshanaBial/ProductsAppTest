import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';
import { INIT_PRODUCTS } from '../config/product.config';
import { Product } from '../config/product.interface';
import { from , of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  private productsListSub: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(INIT_PRODUCTS);
  getProductsList$: Observable<Product[]> = this.productsListSub.asObservable();

  baseUrl = '';//'https://localhost:44304/api/';
  constructor(private http: HttpClient) { }
  getProductsList(isActive:boolean):Observable<Product[]>
  {
    const existProductsList = this.productsListSub.value;
    var x= of(existProductsList
         .filter(x => x.active === isActive)
     );
    return x;


  }
  getProductsFilterByRange(min: number, max: number,isActive:boolean):Observable<Product[]>{
    const existProductsList = this.productsListSub.value;
    var filterProductsActive = existProductsList.filter(x => x.active === isActive);
    //var filteredData =  filterProductsActive.filter(y => y.price >= min && y.price <= max);
    var filteredDataRange= of(filterProductsActive
      .filter(y => y.price >= min && y.price <= max)
  );
    return filteredDataRange;
  }

  getProductById(productId: number): Product {
    const { existProductsList, existIndex } = this.findProductIndexById(productId);
    return existProductsList[existIndex]; 
                
  }
  editProduct(product: Product) {
    this.http.post<any>(`${this.baseUrl}Product`, product).subscribe(
        data => {
           const { existProductsList, existIndex } = this.findProductIndexById(product.productId);
           existProductsList[existIndex] = product;
            this.productsListSub.next(existProductsList);
        }
        ,

        error => {
            console.log(error)
        }
    )
}
  private findProductIndexById(id: number): { existProductsList: Product[], existIndex: number } {
    const existProductsList = this.productsListSub.value;
    return { existProductsList, existIndex: existProductsList.findIndex(item => item.productId === id) };
}
}
