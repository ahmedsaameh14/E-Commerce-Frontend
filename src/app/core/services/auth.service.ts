import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { IAuth, ILoginRes, IReg, IUser } from '../models/model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _http:HttpClient ) {}

  URL = environment.API_URL;
  TOKEN_KEY = 'token'

  // For Rgeistration
  regUser(userdata:IReg): Observable<any>{
    return this._http.post(`${this.URL}/user`,userdata)
  }

  // For Login
  private myUser:BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  public user$ = this.myUser.asObservable();

  // To Get data from Token
  decode(token:string){
    return jwtDecode<IUser>(token);
  }

  setToken(token:string){
    localStorage.setItem(this.TOKEN_KEY , token)
    console.log(this.decode(token));
  }

  getRole():string | null{
    const token = localStorage.getItem(this.TOKEN_KEY)
    if(token){
      return this.decode(token).role
    }
    return null
  }

  getName():string | null{
    const token = localStorage.getItem(this.TOKEN_KEY)
    if(token){
      return  this.decode(token).name
    }
    return null
  }

  getToken(){
    return localStorage.getItem(this.TOKEN_KEY)
  }

  login(data:IAuth): Observable<ILoginRes>{
    return this._http.post<ILoginRes>(`${this.URL}/auth/login`,data).pipe(tap((res)=>{
      this.setToken(res.token);
      console.log(res.token);
      this.myUser.next(this.decode(res.token));
    }))
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY)
    console.log('You Logout');
    this.myUser.next(null);
  }

}
