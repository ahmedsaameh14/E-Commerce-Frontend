import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule , RouterLink],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService , private _router:Router , private _authS:AuthService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
  this.cartService.getUserCart().subscribe((res) => {
    this.cartItems = res.data.filter((item: any) => item.removedAt === null);
  });
}


  removeItem(id: string) {
    this.cartService.removeFromCart(id).subscribe(() => this.loadCart());
  }

  

  updateQuantity(id: string, quantity: number) {
    if (quantity < 1) return;
    this.cartService.updateCartItem(id, quantity).subscribe(() => this.loadCart());
  }

  confirmPriceChange(id: string) {
    this.cartService.confirmPriceChange(id).subscribe(() => this.loadCart());
  }

  onQuantityChange(event: Event, id: string) {
  const input = event.target as HTMLInputElement;
  const quantity = parseInt(input.value, 10);

  if (quantity > 0) {
    this.cartService.updateCartItem(id, quantity).subscribe(() => this.loadCart());
  }
}

getTotal(): number {
  return this.cartItems.reduce((total, item) => total + (item.currentPrice * item.quantity), 0);
}

 goToCheckout(): void {
    if (!this.isLoggedIn()) {
      this._router.navigate(['/auth/login']);
      return;
    }
    this._router.navigate(['/checkout']);
  }

  isLoggedIn(): boolean {
    return !!this._authS.getToken();
  }

  
}
