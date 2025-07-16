import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import {
  IOrders,
  IProfile,
} from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(
    private _profileServices: ProfileService,
    private _orderService: OrderService,
    private _authService: AuthService,
    private _router: Router
  ) { }
  profileData!: IProfile;
  orders: IOrders[] = [];
  isLoading = true;

  ngOnInit() {
    this.getProfile();
    this.getOrders();
  }
  getProfile() {
    this._profileServices.getUser().subscribe({
      next: (res) => {
        this.profileData = res.data;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
      },
    });
  }
  getOrders(): void {
    this._orderService.getUserOrders().subscribe({
      next: (res) => {
        this.orders = res.orders;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.isLoading = false;
      },
    });
  }
  logout() {
    this._authService.logout()
    setTimeout(() => {
      this._router.navigate(['/'])
    }, 2000)
  }
}
