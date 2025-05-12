import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of, interval } from 'rxjs';
import { map } from 'rxjs/operators';

// Custom Pipes
import { ReversePipe } from './pipes/reverse.pipe';
import { MultiplyPipe } from './pipes/multiply.pipe';
import { FilterPipe } from './pipes/filter.pipe';

@Component({
  selector: 'app-pipe-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReversePipe, MultiplyPipe, FilterPipe],
  template: `
    <div class="pipe-demo">
      <h2>Angular Pipes Demo</h2>

      <!-- Date Pipe -->
      <section class="demo-section">
        <h3>Date Pipe</h3>
        <div class="pipe-example">
          <p>Default: {{ today | date }}</p>
          <p>Short: {{ today | date:'short' }}</p>
          <p>Medium: {{ today | date:'medium' }}</p>
          <p>Long: {{ today | date:'long' }}</p>
          <p>Custom: {{ today | date:'yyyy-MM-dd HH:mm:ss' }}</p>
        </div>
      </section>

      <!-- String Pipes -->
      <section class="demo-section">
        <h3>String Pipes</h3>
        <div class="pipe-example">
          <input [(ngModel)]="text" placeholder="Type something...">
          <p>Original: {{ text }}</p>
          <p>Uppercase: {{ text | uppercase }}</p>
          <p>Lowercase: {{ text | lowercase }}</p>
          <p>Titlecase: {{ text | titlecase }}</p>
          <p>Reversed: {{ text | reverse }}</p>
        </div>
      </section>

      <!-- Number Pipes -->
      <section class="demo-section">
        <h3>Number Pipes</h3>
        <div class="pipe-example">
          <input type="number" [(ngModel)]="number" placeholder="Enter a number">
          <p>Original: {{ number }}</p>
          <p>Decimal: {{ number | number:'1.2-2' }}</p>
          <p>Percent: {{ number | percent:'1.2-2' }}</p>
          <p>Currency (USD): {{ number | currency:'USD':'symbol' }}</p>
          <p>Currency (EUR): {{ number | currency:'EUR':'code' }}</p>
          <p>Multiplied by 2: {{ number | multiply:2 }}</p>
        </div>
      </section>

      <!-- Slice Pipe -->
      <section class="demo-section">
        <h3>Slice Pipe</h3>
        <div class="pipe-example">
          <p>String: {{ text | slice:0:5 }}...</p>
          <p>Array: {{ numbers | slice:1:3 | json }}</p>
        </div>
      </section>

      <!-- Async Pipe -->
      <section class="demo-section">
        <h3>Async Pipe</h3>
        <div class="pipe-example">
          <p>Observable: {{ timer$ | async }}</p>
          <p>Promise: {{ promiseValue | async }}</p>
          <div *ngIf="user$ | async as user">
            <p>User: {{ user.name }}</p>
            <p>Role: {{ user.role }}</p>
          </div>
        </div>
      </section>

      <!-- Filter Pipe -->
      <section class="demo-section">
        <h3>Filter Pipe</h3>
        <div class="pipe-example">
          <input [(ngModel)]="searchTerm" placeholder="Search items...">
          <ul>
            <li *ngFor="let item of items | filter:searchTerm">
              {{ item }}
            </li>
          </ul>
        </div>
      </section>

      <!-- JSON Pipe -->
      <section class="demo-section">
        <h3>JSON Pipe</h3>
        <div class="pipe-example">
          <pre>{{ complexObject | json }}</pre>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .pipe-demo {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .demo-section {
      margin-bottom: 2rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .pipe-example {
      padding: 1rem;
      background-color: #f8f9fa;
      margin: 1rem 0;
      border-radius: 4px;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      margin: 0.5rem 0;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    pre {
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
    }

    li:last-child {
      border-bottom: none;
    }
  `]
})
export class PipeDemoComponent implements OnInit {
  // Date pipe
  today = new Date();

  // String pipes
  text = 'Hello Angular';

  // Number pipes
  number = 1234.5678;

  // Slice pipe
  numbers = [1, 2, 3, 4, 5];

  // Async pipe
  timer$ = interval(1000).pipe(
    map(() => new Date().toLocaleTimeString())
  );
  promiseValue = Promise.resolve('Promise resolved!');
  user$ = of({ name: 'John Doe', role: 'Admin' });

  // Filter pipe
  searchTerm = '';
  items = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'];

  // JSON pipe
  complexObject = {
    name: 'John',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'New York',
      country: 'USA'
    },
    hobbies: ['reading', 'gaming', 'coding']
  };

  ngOnInit() {
    // Initialize any required data
  }
} 