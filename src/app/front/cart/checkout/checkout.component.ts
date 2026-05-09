import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { ICartResponse } from '../../../core/models/model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  address1 = '';
  address2 = '';
  address3 = '';
  address4 = '';
  phone = '';
  paymentMethod = 'Cash';
  cartItems: ICartResponse[] = [];

  constructor(
    private _cartService: CartService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._cartService.getUserCart().subscribe({
      next: (items) => {
        const rawItems = items?.data ?? items;
        this.cartItems = Array.isArray(rawItems) ? rawItems : [];
      },
      error: (err) => console.error('Failed to load cart items:', err),
    });
  }

  placeOrder() {
  const activeCartItems = Array.isArray(this.cartItems)
    ? this.cartItems.filter((item: any) => item.removedAt == null)
    : [];

  const orderData = {
    shippingData: {
      address: [this.address1, this.address2, this.address3, this.address4],
      phone: this.phone,
    },
    paymentMethod: this.paymentMethod,
    products: activeCartItems.map((item) => ({
          productId: item.productId?._id ?? item.productId,
          quantity: item.quantity,
          price: item.currentPrice,
        }))
  };

  this._cartService.placeOrder(orderData).subscribe({
    next: (res) => {
      this._router.navigate(['/']);
    },
    error: (err) => {
      console.error('Order submission error:', err);
    },
  });
}
}
