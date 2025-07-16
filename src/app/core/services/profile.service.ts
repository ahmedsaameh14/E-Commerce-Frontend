import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfile } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 URL = environment.API_URL;
  constructor(private _http: HttpClient) {}

  getUser(): Observable<{ data: IProfile }> {
  const token = localStorage.getItem('token'); // adjust the key if needed
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this._http.get<{ data: IProfile }>(this.URL + `/user`, { headers });
}

}
