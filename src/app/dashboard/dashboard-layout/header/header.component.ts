import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 constructor( private _authS: AuthService , private _router:Router ){}

    logout(){
    this._authS.logout();
    this._router.navigate(['/home'])
    console.log('You logout');
  }
}
