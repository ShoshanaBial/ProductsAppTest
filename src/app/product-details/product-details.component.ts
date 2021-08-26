import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PRODUCT_FORM_FIELDS } from '../config/product.config';
import { Product } from '../config/product.interface';
import { ProductsService } from '../services/products.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  visible = true;
  product: Product | undefined;
  form!: FormGroup;
  listenToProductId: Subscription
  readonly formFields = PRODUCT_FORM_FIELDS;
  constructor(private route: ActivatedRoute,
    public router: Router,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef) {
    this.createForm();
  }
  createForm() {
    const formFields = this.formFields.reduce((obj, field) =>
      ({ ...obj, [field.key]: [null, field.validators] }), {}
    )
    this.form = this.formBuilder.group(formFields);
  }
  ngOnInit(): void {
    this.listenToProductId = this.route.params.subscribe(
      params => {
        if (params['productId'] > -1)
          this.product = this.getProductData(+params['productId']);

      });
  }
  getProductData(productId: number): Product {
    return this.productsService.getProductById(productId);
  }

  ngAfterViewInit() {
    this.form.patchValue(this.product || {});
    this.cdr.detectChanges();
  }
  cleanForm() {
    this.form.reset();
  }
  onSubmit() {
    //לשלוח לסרבר וכשחוזר אז לעשות הוספת קליינט
    this.productsService.editProduct(this.form.value as Product);
  }
  close() {
    this.router.navigate(["productsList"]);
  }

  ngOnDestroy() {
   
    this.listenToProductId.unsubscribe();

  }
  



}
