import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../config/product.interface';
import { TABLE_COLUMNS, TABLE_HEADERS } from '../config/product.config';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productsListActive$!: Observable<Product[]>;
  productsListNotActive$!: Observable<Product[]>;
  cols = TABLE_COLUMNS;
  tableHeaders = TABLE_HEADERS
  constructor(
    private productsService: ProductsService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //this.productsList$ = this.productsService.getProductsList$;
    this.productsListActive$ = this.productsService.getProductsList(true);
    this.productsListNotActive$ = this.productsService.getProductsList(false);
  }

  editProduct(productId: number): void {
    this.router.navigate([productId], { relativeTo: this.route });
  }
  getProductsFilterByRange(value: string, isActive: boolean) {
    let filteredDataRange: Observable<Product[]>;
    if (value) {
      var splitted = value.split(",");
      filteredDataRange = this.productsService.getProductsFilterByRange(Number(splitted[0]), Number(splitted[1]), isActive);

    }
    else
      filteredDataRange = this.productsService.getProductsList(isActive);

    if (isActive)
      this.productsListActive$ = filteredDataRange;
    else
      this.productsListNotActive$ = filteredDataRange;
  }

}
