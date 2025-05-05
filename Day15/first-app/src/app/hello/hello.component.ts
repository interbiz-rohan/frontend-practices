import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="hello-container">
      <h3>Hello, {{ name }}!</h3>
      
      <div class="counter-section">
        <button (click)="increment()">Click me</button>
        <p>You clicked {{ count }} times.</p>
      </div>

      <div class="two-way-binding">
        <input [(ngModel)]="name" placeholder="Enter your name" />
        <p>Your name is: {{ name }}</p>
      </div>

      <div class="conditional-section">
        <button (click)="toggleVisibility()">
          {{ isVisible ? 'Hide' : 'Show' }} Message
        </button>
        <p *ngIf="isVisible" class="message">
          This message is conditionally displayed!
        </p>
      </div>
    </div>
  `,
  styles: [`
    .hello-container {
      padding: 20px;
      max-width: 500px;
      margin: 0 auto;
      text-align: center;
    }
    h3 {
      color: #1976d2;
      margin-bottom: 20px;
    }
    .counter-section {
      margin: 20px 0;
    }
    .two-way-binding {
      margin: 20px 0;
    }
    .conditional-section {
      margin-top: 20px;
    }
    button {
      padding: 8px 16px;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin: 5px;
    }
    button:hover {
      background-color: #1565c0;
    }
    input {
      padding: 8px;
      margin: 10px 0;
      width: 200px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .message {
      padding: 10px;
      background-color: #e3f2fd;
      border-radius: 4px;
      margin-top: 10px;
    }
  `]
})
export class HelloComponent implements OnInit {
  name = 'Angular';
  count = 0;
  isVisible = true;

  ngOnInit() {
    console.log('HelloComponent initialized');
  }

  increment() {
    this.count++;
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
} 