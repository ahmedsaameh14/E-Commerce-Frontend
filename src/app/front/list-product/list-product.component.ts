import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  selector: 'app-list-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent implements OnInit {
  products: IProduct[] = [];
  currentPage = 1;
  totalPages = 1;

  constructor(
    private _productS: ProductsService, 
    private _cartS: CartService,
    private _authS: AuthService,
    private _router: Router,
    private _notificationS: NotificationService
  ) { }

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
    // Scroll to top
    window.scrollTo(0, 0);
  }

  addToCart(productId: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    // Check if user is authenticated
    if (!this._authS.getToken()) {
      this._notificationS.showWarning('Please login first to add items to cart');
      this._router.navigate(['/login'], { queryParams: { returnurl: '/products' } });
      return;
    }

    const quantity = 1; 
    this._cartS.addToCart(productId, quantity).subscribe({
      next: () => {
        this._notificationS.showSuccess('Product added to cart successfully!');
      },
      error: (err) => {
        this._notificationS.showError('Failed to add product to cart');
        console.error('Failed to add to cart:', err.error?.message || err.message);
      }
    });
  }


}
