import { Validators } from "@angular/forms";
import { DropdownItemBool, DropdownItemString, Product } from "./product.interface";

export const INIT_PRODUCTS: Product[] = [
    {productId:1,price:22.22,name:"AAAA",mkt:112233,count:20,active:true},
    {productId:2,price:33.33,name:"BBBB",mkt:223344,count:30,active:true},
    {productId:3,price:155.44,name:"CCCC",mkt:445566,count:40,active:true},
    {productId:4,price:100.55,name:"DDDD",mkt:667788,count:20,active:false},



]
export const PRICE_FILTER_LIST: DropdownItemString[] = [
    { label: '0 - 50', value: "0,50" },
    { label: '50 - 100', value: "50,100" },
    { label: '100- 200', value: "100,200" },
    { label: '200 ומעלה', value: "200,10000000" },
  
    
]


export const TABLE_COLUMNS = [
    { field: 'mkt', header: 'מק"ט' ,pipe:false ,filterType: 'input' },
    { field: 'name', header: 'שם' ,pipe:false,filterType: 'input'},
    { field: 'count', header: 'כמות' ,pipe:false,filterType: 'input'},
    { field: 'price', header: 'מחיר' ,pipe:false , filterType: 'dropdown', options: PRICE_FILTER_LIST},
    { field: 'active', header: 'פעיל?',pipe:true ,filterType: 'input'}

]
export const ACTIVE_TYPE_LIST: DropdownItemBool[] = [
    { label: 'לא פעיל ', value: false },
    { label: 'פעיל', value: true },
    
];

export const PRODUCT_FORM_FIELDS = [
    { key: 'productId', label: 'מזהה', validators: [], controlType: 'input' ,isHidden: 'true'},
    { key: 'mkt', label: 'מק"ט', validators: [Validators.required], controlType: 'input' ,type:'number',class:'p-col-3'},
    { key: 'name', label: 'שם',  validators: [Validators.required], controlType: 'input' ,class:'p-col-3' },
    { key: 'count', label:'כמות',  validators: [Validators.required,Validators.min(1)], controlType: 'input',type:'number' ,class:'p-col-6'},
    { key: 'price', label: 'מחיר',  validators: [Validators.required,Validators.min(1), Validators.pattern("^[0-9]+(\.[0-9]{1,10})?$")], controlType: 'input' , type: 'number',class:'p-col-12'  },
    { key: 'active', label: 'פעיל',  validators: [Validators.required], controlType: 'dropdown',options: ACTIVE_TYPE_LIST ,class:'p-col-6'},

]
export const  ERROR_MESSAGE_MAP = {
    required: () => 'שדה חובה',
    min:() => 'ערך מינימלי 1'
  };
  export const TABLE_HEADERS = [
    { key: 'active', header: 'מוצרים פעילים' },
    { key: 'notActive', header: 'מוצרים לא פעילים' },
   
]