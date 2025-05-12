import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-message',
  standalone: true,
  template: `
    <p>👋 Hello, <strong>{{ username }}</strong>! Welcome back.</p>
  `
})
export class WelcomeMessageComponent {
  @Input() username = 'Guest';
}
