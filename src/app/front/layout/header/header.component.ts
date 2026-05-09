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

  isMenuCollapsed = true; // State for mobile menu

  // Mocking the user observable for structure
  // user$ = this.authService.user$; 

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  closeMenu() {
    this.isMenuCollapsed = true;
  }

  navigateHome() {
    this.closeMenu();
    // If user is admin, redirect to dashboard
    if (this._authS.getRole() === 'admin') {
      this._router.navigate(['/dashboard']);
    } else {
      this._router.navigate(['/home']);
    }
  }
  
}
