import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  // { path: 'productDetails/:productId', component: ProductDetailsComponent },
  {
    path: 'productsList', component: ProductsListComponent, children: [
      { path: ':productId', component: ProductDetailsComponent },]
  },
  { path: '**', redirectTo: 'productsList' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
