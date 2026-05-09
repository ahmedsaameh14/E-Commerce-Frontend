import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  constructor(private _authS: AuthService, private _router: Router) {}

  ngOnInit(): void {
    // Redirect admin users to dashboard
    if (this._authS.getRole() === 'admin') {
      this._router.navigate(['/dashboard']);
    }
  }
}
