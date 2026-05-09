import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , CommonModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private _authS:AuthService , 
  private _router:Router , 
  private _activatedRoute: ActivatedRoute,
  private _notificationS: NotificationService){}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  serverErrors: { [key: string]: string } = {};

  login(){
    this.serverErrors = {};
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this._authS.login(this.loginForm.value).subscribe({
      next:()=>{
        const returnedRoute = this._activatedRoute.snapshot.queryParamMap.get('returnurl')    // To use snapshot should call ActivatedRoute
        const isAdminRoute = returnedRoute?.startsWith('/dashboard');
        const isUserRoute = returnedRoute?.startsWith('/');

        if(this._authS.getRole() === 'user' && this._authS.getToken()){

          if(returnedRoute && isUserRoute){
            this._router.navigateByUrl(returnedRoute)
          }else {
            this._router.navigate(['/home'])
          }
        }

        else if (this._authS.getRole() === 'admin' && this._authS.getToken()){

          if(returnedRoute && isAdminRoute){
            this._router.navigateByUrl(returnedRoute)
          }else{
            this._router.navigate(['/dashboard'])
          }
        }

        this._notificationS.showSuccess('Login successful!');
      },
      error: (err) =>{
        const errorMessage = err.error?.message || 'Login failed. Please try again.';
        this._notificationS.showError(errorMessage);
        
        // Handle field-specific errors
        if (err.error?.errors) {
          this.serverErrors = err.error.errors;
        }
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    
    // Server-side error
    if (this.serverErrors[fieldName]) {
      return this.serverErrors[fieldName];
    }

    // Client-side validation errors
    if (field?.touched && field?.invalid) {
      if (fieldName === 'email') {
        if (field.errors?.['required']) return 'Email is required';
        if (field.errors?.['email']) return 'Enter a valid email';
      } else if (fieldName === 'password') {
        if (field.errors?.['required']) return 'Password is required';
        if (field.errors?.['minlength']) return 'Password must be at least 6 characters';
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.invalid && field?.touched) || !!this.serverErrors[fieldName];
  }
}
