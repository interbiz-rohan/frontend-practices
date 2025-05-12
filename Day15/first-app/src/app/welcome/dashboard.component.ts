import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WelcomeMessageComponent } from './welcome-message.compoent';
import { UserService } from './user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, WelcomeMessageComponent],
  providers: [UserService],
  template: `
    <h2>📊 Dashboard</h2>
    <app-welcome-message [username]="username"></app-welcome-message>

    <form>
      <label>Update Name:
        <input [(ngModel)]="username" name="username" />
      </label>
    </form>

    <p><strong>Service Data:</strong> {{ userService.getGreeting() }}</p>
  `
})

export class DashboardComponent {
  username = 'Angular Dev';

  constructor(public userService: UserService) {}
}
