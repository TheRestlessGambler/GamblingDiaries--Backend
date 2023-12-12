import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface SignupResponse {
  user: object;
  message: string;
  token: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  gender: string = '';
  phoneNumber: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSignup(): void {
    console.log("this button is working")
    const signupEndpoint = 'http://localhost:3000/signup';
    this.http
      .post<SignupResponse>(signupEndpoint, {
        username: this.username,
        password: this.password,
        email: this.email,
        gender: this.gender,
        phoneNumber: this.phoneNumber,
      })
      .subscribe(
        (response) => {
          console.log('Signup Successful:', response.message);
          this.router.navigate(['/user-dashboard']);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user',JSON.stringify(response.user));
        },
        (error) => {
          console.error('Signup Error', error);
  
          if (error.status === 400) {
            alert('Email is already in use.');
          } else if (error.status === 500) {
            alert('Internal server error. Please try again later.');
          } else {
            alert('Something went wrong!');
          }
  
          // Handle other error cases if needed
        }
      );
  }
}  