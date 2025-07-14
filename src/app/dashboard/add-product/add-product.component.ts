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
  currentPage = 1;
  totalPages = 1;

  constructor(private _produstS: ProductsService, private _router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  
  goToAdd() {
    this._router.navigate(['/dashboard/addproduct/form']);
  }
  
  editProduct(id: string) {
    this._router.navigate(['/dashboard/addproduct/form', id]);
  }
  
  loadProducts(page: number = 1): void {
    this._produstS.getProducts(page).subscribe((res) => {
      this.products = res.result;
      this.currentPage = res.page;
      this.totalPages = res.totalPages;
    });
  }
  
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.loadProducts(page);
  }
}
