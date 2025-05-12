import { Component } from '@angular/core';
import { LifecycleDemoComponent } from './lifecycle-demo/lifecycle-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LifecycleDemoComponent],
  template: `
    <div class="app-container">
      <h1>Angular Lifecycle Hooks Demo</h1>
      <app-lifecycle-demo initialValue="Hello from parent"></app-lifecycle-demo>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #333;
      text-align: center;
    }
  `]
})
export class AppComponent {
  title = 'lifecycle-demo';
}
