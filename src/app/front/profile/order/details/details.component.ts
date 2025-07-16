import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service'
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  constructor(
    private _orderService: OrderService,
    private activeRoute: ActivatedRoute,
    private _router:Router,
    
  ) {}
  selectedOrderProducts: any[] = [];
  expandedOrderId: string | null = '';
  orderDetails: any = null;
  id!: string;
  private sub! : Subscription
  ngOnInit(): void {
    const orderId = this.activeRoute.snapshot.paramMap.get('id');
    if (orderId) {
      this.viewOrderDetails(orderId);
    }
  }
  viewOrderDetails(orderId: string) {
    
    this.expandedOrderId = this.expandedOrderId === orderId ? '' : orderId;

    if (this.expandedOrderId) {
      this._orderService.getOrderByIdByUser(orderId).subscribe({
        next: (res) => {
          this.orderDetails = res?.order;
          this.selectedOrderProducts = res?.order?.products || [];
        },
        error: (err) => {
        },
      });
    } else {
      this.orderDetails = null;
      this.selectedOrderProducts = [];
    }
    console.log('Products:', this.selectedOrderProducts);
    
  }
  cancelOrder(orderId: string) {
    if (!orderId || this.orderDetails?.status !== 'pending') return;

    this._orderService.cancelOrderByUser(orderId, 'cancelled').subscribe({
      next: () => {
        this.orderDetails.status = 'cancelled'; 
        this._router.navigate(['/profile'])
      },
      error: (err) => {
        console.error('Error cancelling order:', err);
      },
    });
  }
  calculateSubtotal(): number {
    if (!this.selectedOrderProducts) return 0;
    return this.selectedOrderProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  ngOnDestory(){
    this.sub.unsubscribe()
  }
}
