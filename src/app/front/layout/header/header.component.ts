import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from '../../../core/models/model';

@Component({
  selector: 'app-header',
  imports: [CommonModule , RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  user$: Observable<IUser | any>
  constructor( private _authS: AuthService , private _router:Router ){
    this.user$ = this._authS.user$
  }

  logout(){
    this._authS.logout();
    this._router.navigate(['/home'])
    console.log('You logout');
    
  }
  
}
