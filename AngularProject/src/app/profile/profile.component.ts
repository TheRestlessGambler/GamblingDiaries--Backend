import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface UpdateResponse{
  user: object
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {


  



  user: any = {
    username: '',
    email: '',
    phoneNumber: '',
    gender: 'Male',
  };

  activeButton: number = 1;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Fetch user object from local storage
    const storedUser = localStorage.getItem('user');

    // Parse the JSON string to an object
    this.user = storedUser ? JSON.parse(storedUser) : {};
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.user.avatar = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  toggleButton(buttonNumber: number) {
    this.activeButton = buttonNumber;
  }

  isEditMode = true;

  disableInput(event: Event) {
    event.preventDefault();
    this.isEditMode = !this.isEditMode;
  }

  updateSubmit(): void {
    console.log('This button is working');
    // Get the stored user JSON string from local storage
    const storedUserString = localStorage.getItem('user');

    // Parse the JSON string to an object
    const storedUser = storedUserString ? JSON.parse(storedUserString) : {};

    // Access the 'username' property
    const oldUsername = storedUser.username;

    // Now, 'username' contains the value "scared"
    console.log(oldUsername);

    const updateEndpoint = 'http://localhost:3000/update';
    this.http
      .put<UpdateResponse>(updateEndpoint, {
        oldUsername: oldUsername,
        username: this.user.username,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        gender: this.user.gender,
      })
      .subscribe(
        (response) => {
          console.log('Update Successful');
          this.router.navigate(['/profile']);
          localStorage.setItem('user',JSON.stringify(response.user));
        },
        (error) => {
          console.error('Update Error!', error);
        }
      );
  }
}
