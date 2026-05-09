import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { IReg } from '../../core/models/model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule , RouterLink],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css',
})
export class RegComponent {
  constructor(
    private _authS: AuthService, 
    private _router: Router,
    private _notificationS: NotificationService
  ) {}

  regForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  serverErrors: { [key: string]: string } = {};

  onSubmit() {
    this.serverErrors = {};

    if (this.regForm.invalid) {
      this.regForm.markAllAsTouched();
      return;
    }

    this._authS.regUser(this.regForm.value).subscribe({
      next: (res) => {
        this._notificationS.showSuccess('Registration successful! Please login to continue.');
        this._router.navigate(['/login']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Registration failed. Please try again.';
        this._notificationS.showError(errorMessage);
        
        // Handle field-specific errors
        if (err.error?.errors) {
          this.serverErrors = err.error.errors;
        }
      },
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.regForm.get(fieldName);
    
    // Server-side error
    if (this.serverErrors[fieldName]) {
      return this.serverErrors[fieldName];
    }

    // Client-side validation errors
    if (field?.touched && field?.invalid) {
      if (fieldName === 'name') {
        if (field.errors?.['required']) return 'Name is required';
      } else if (fieldName === 'email') {
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
    const field = this.regForm.get(fieldName);
    return !!(field?.invalid && field?.touched) || !!this.serverErrors[fieldName];
  }
}
