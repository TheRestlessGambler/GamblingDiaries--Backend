import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router: Router) {}

  userClick(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile']);
  }
  logoutClick(event: Event) {
    event.preventDefault();
    this.router.navigate(['/signin']);
  }
  journalClick(event: Event){
    event.preventDefault();
    this.router.navigate(['/journal'])
  }
}
