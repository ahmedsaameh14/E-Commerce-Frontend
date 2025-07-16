import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {

  private URL = environment.API_URL;

  constructor(private http: HttpClient) {}

 addToCart(productId: string, quantity: number = 1) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  return this.http.post(`${this.URL}/cart`, { productId, quantity }, { headers });
}

getUserCart(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  return this.http.get(`${this.URL}/cart`, { headers });
}

updateCartItem(id: string, quantity: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  return this.http.put(`${this.URL}/cart/${id}`, { quantity }, { headers });
}

removeFromCart(id: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  return this.http.put(`${this.URL}/cart/remove`, { id }, { headers });
}

confirmPriceChange(id: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  return this.http.put(`${this.URL}/cart/confirm-price`, { id }, { headers });
}

placeOrder(orderData: any) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  return this.http.post(`${this.URL}/orders`, orderData, { headers });
}

}
