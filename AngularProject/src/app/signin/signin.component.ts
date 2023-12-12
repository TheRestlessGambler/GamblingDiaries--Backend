import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSignup(): void {
    this.router.navigate(['/signup']);
    
  }

  onLogin(): void {
    const loginEndpoint = 'http://localhost:3000/login';
    this.http.post<{ token: string }>(loginEndpoint, {
        username: this.username,
        password: this.password,
      })
      .subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/user-dashboard']);
          localStorage.setItem('token',JSON.stringify(response.token) );
          localStorage.setItem('username',this.username);
        },
        (error) => {
          console.error('Login error:', error);
          alert('Incorrect details');
          // Handle error, show error message, etc.
        }
      );
  }
}
