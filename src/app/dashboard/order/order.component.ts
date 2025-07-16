import { Component, OnInit } from '@angular/core';
import { IOrders } from '../../core/models/model';
import { OrderService } from '../../core/services/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [FormsModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: IOrders[] = [];
  isLoading = true;
  selectedStatus: string = '';
  filteredOrders: IOrders[] = [];
  expandedOrderId!: string ;
  selectedOrder: IOrders | null = null;
  statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'returned', label: 'Returned' }
  ];
  constructor(private _ordersService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrderByAdmin();
  }

  getAllOrderByAdmin() {
    this._ordersService.getAllOrderByAdmin().subscribe({
      next: (res) => {
        this.orders = res.orders;
        this.filteredOrders = res.orders;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch orders', err);
        this.isLoading = false;
      },
    });
  }
  getOrderDetails(){
    this._ordersService.getOrderByIdByAdmin(this.expandedOrderId).subscribe({
      next:(data)=>{ console.log(data)}
    })
  }
  updateStatus(orderId: string, newStatus: string): void {
    this._ordersService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        console.log('Order status updated');
      },
      error: (err) => {
        console.error('Error updating status:', err);
      },
    });
  }
  calculateOrderTotal(order: any): number {
    return order.products.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
  }

  viewOrderDetails(orderId: string) {
    this.expandedOrderId = this.expandedOrderId === orderId ? '' : orderId;
  
    if (this.expandedOrderId) {
      this._ordersService.getOrderByIdByAdmin(orderId).subscribe({
        next: (res) => {
          this.selectedOrder = res.order; // assuming response shape
        },
        error: (err) => {
          console.error('Error loading order details:', err);
        }
      });
    } else {
      this.selectedOrder = null;
    }
  }
  
  getStatusColor(status: string): string {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'returned':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }
  filterOrders(): void {
    if (this.selectedStatus === '') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(
        (order) =>
          order.status.toLowerCase() === this.selectedStatus.toLowerCase()
      );
    }
  }
  // getTotalAmount(order: IOrders): number {
  //   return order.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  // }
}
