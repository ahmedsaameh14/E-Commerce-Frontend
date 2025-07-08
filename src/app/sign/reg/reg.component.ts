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

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule , RouterLink],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css',
})
export class RegComponent {
  constructor(private _authS: AuthService, private _router: Router) {}

  regForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.regForm.invalid) {
      this.regForm.markAllAsTouched();
      return;
    }

    this._authS.regUser(this.regForm.value).subscribe({
      next: (res) => {
        console.log('Registration Successful', res);
        this._router.navigate(['/login']);
      },
      error: (err) => console.log('Registration Failed', err),
    });
  }
}
