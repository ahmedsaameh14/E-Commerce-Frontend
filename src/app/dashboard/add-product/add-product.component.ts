import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IProduct } from '../../core/models/model';
import { ProductsService } from '../../core/services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private _produstS: ProductsService, private _router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this._produstS.getProducts().subscribe((res) => {
      this.products = res.result;
    });
  }

  goToAdd() {
    this._router.navigate(['/dashboard/addproduct/form']);
  }

  editProduct(id: string) {
    this._router.navigate(['/dashboard/addproduct/form', id]);
  }
}
