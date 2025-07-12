import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../../core/models/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CommonModule , RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
constructor(private _productS: ProductsService , private _activatedRoute:ActivatedRoute){}

id!:string | null
product !:IProduct
products !: IProduct[]

ngOnInit(): void {

  this.id = this._activatedRoute.snapshot.params['id'];
this._activatedRoute.paramMap.subscribe(param=>{
  this.id = param.get('id')
  
  if(this.id){
  this._productS.getProductById(this.id).subscribe(res=>{
    this.product = res.data
  });
  this._productS.getRelatedProducts(this.id).subscribe(res => {
  console.log('Related products:', res.data);
  this.products = res.data;
});

}
})
}
}
