import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { IReg } from '../models/model';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _http:HttpClient ) {}

  URL = environment.API_URL;
  TOKEN_KEY = 'token'

  regUser(userdata:IReg): Observable<any>{
    return this._http.post(`${this.URL}/user`,userdata)
  }
  
}
