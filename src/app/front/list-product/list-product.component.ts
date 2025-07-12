import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-product',
  imports: [CommonModule , RouterLink],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent implements OnInit {
  products: IProduct[] = [];
  currentPage = 1;
  totalPages = 1;

  constructor(private _productS: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(page: number = 1): void {
    this._productS.getProducts(page).subscribe((res) => {
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
