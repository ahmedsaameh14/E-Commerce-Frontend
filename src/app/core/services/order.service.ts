import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrders } from '../models/model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private URL = environment.API_URL;
  constructor(private _http: HttpClient) {}

  
getUserOrders(): Observable<{ orders: IOrders[] }> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this._http.get<{ orders: IOrders[] }>(this.URL + '/orders', { headers });
}

getOrderByIdByUser(orderId: string) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this._http.get<any>(this.URL + '/orders/' + orderId, { headers });
}

getAllOrderByAdmin(): Observable<{ orders: IOrders[] }> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this._http.get<{ orders: IOrders[] }>(this.URL + '/orders/byAdmin', { headers });
}

getOrderByIdByAdmin(orderId: string) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this._http.get<any>(this.URL + '/orders/' + orderId + '/byAdmin', { headers });
}

updateOrderStatus(orderId: string, status: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this._http.put(this.URL + '/orders/status/' + orderId + '/byAdmin', {
    orderId,
    status
  }, { headers });
}

cancelOrderByUser(orderId: string, status: string) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this._http.put(this.URL + '/orders/cancel/' + orderId + '/status', {
    orderId,
    status
  }, { headers });
}
}
