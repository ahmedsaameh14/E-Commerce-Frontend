import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , CommonModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private _authS:AuthService , 
  private _router:Router , 
  private _activatedRoute: ActivatedRoute){}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  login(){
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

        console.log('Login Ok');
      },
      error: (err) =>{console.log(err.message)}
    })
  }


}
