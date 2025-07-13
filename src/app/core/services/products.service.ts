import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { IProductRelatedRes, IProductsRes } from '../models/model';
import { IProductRes } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http:HttpClient , private _authS:AuthService) { }

  URL = environment.API_URL + '/products/'
  subCategoryURL = environment.API_URL + '/subcategory';

  getProducts(page: number = 1, limit: number = 6) {
  return this._http.get<IProductsRes>(`${this.URL}?page=${page}&limit=${limit}`);
  }

  getProductById(id:string){
    return this._http.get<IProductRes>(this.URL + id)
  }

  getRelatedProducts(id:string){
    return this._http.get<IProductRelatedRes>(this.URL + 'related/' + id)
  }

  addProduct(formData: FormData) {
    const token = localStorage.getItem('token'); // adjust key if needed
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this._http.post(`${this.URL}`, formData, { headers });
  }

  updateProduct(id: string, formData: FormData) {
    return this._http.put(`${this.URL}${id}`, formData);
  }

  getSubCategories(): Observable<{ message: string; data: { _id: string, name: string }[] }> {
    return this._http.get<{ message: string; data: { _id: string, name: string }[] }>(this.subCategoryURL);
  }

  addSubCategory(name: string) {
    return this._http.post(this.subCategoryURL, { name });
  }

  

}
