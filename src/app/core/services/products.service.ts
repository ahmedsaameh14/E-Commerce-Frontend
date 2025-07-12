import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { IProductRelatedRes, IProductsRes } from '../models/model';
import { IProductRes } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http:HttpClient , private _authS:AuthService) { }

  URL = environment.API_URL + '/products/'

  getProducts(page: number = 1, limit: number = 6) {
  return this._http.get<IProductsRes>(`${this.URL}?page=${page}&limit=${limit}`);
  }

  getProductById(id:string){
    return this._http.get<IProductRes>(this.URL + id)
  }

  getRelatedProducts(id:string){
    return this._http.get<IProductRelatedRes>(this.URL + 'related/' + id)
  }


}
