import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule , RouterLink],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

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

checkout(): void {
  
}

  
}
