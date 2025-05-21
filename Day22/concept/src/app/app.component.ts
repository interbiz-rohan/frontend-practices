import { ApplicationRef, ChangeDetectorRef, Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ TaskComponent],
  template: `
    <div class="section">
      <h2>Basic Signal Example</h2>
      <p>Count: {{ count().value }}</p>
      <button (click)="increment()">Increment</button>
    </div>

    <div class="section">
      <h2>Computed Signal Example</h2>
      <p>Double Count: {{ doubleCount() }}</p>
    </div>

    <div class="section">
      <h2>Object Signal Example</h2>
      <p>User Name: {{ user().name }}</p>
      <p>User Age: {{ user().age }}</p>
      <button (click)="updateUserAge()">Update Age</button>
    </div>

    <div class="section">
      <h2>Form Signal Example</h2>
      <input [value]="email()" (input)="updateEmail($event)" placeholder="Enter email" />
      <p>Email: {{ email() }}</p>
      <p>Is Valid: {{ isValidEmail() }}</p>
    </div>

    <div class="section">
      <h2>Template Control Flow Example</h2>
      <button (click)="toggleList()">Toggle List</button>
      @if (showList()) {
        <ul>
          @for (item of items(); track item) {
            <li>{{ item }}</li>
          }
        </ul>
      }
    </div>

    <div class="section">
      <h2>Effect Example</h2>
      <p>Effect Log: {{ effectLog() }}</p>
    </div>

    <div class="section">
      <h2>Two-Way Binding Example</h2>
      <app-task [value]="count()" (setValue)="count.set($event)" />
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  count = signal({ value: 0 });
  doubleCount = computed(() => this.count().value * 2);
  user = signal({ name: 'John', age: 30 });
  email = signal('');
  isValidEmail = computed(() => this.email().includes('@'));
  showList = signal(true);
  items = signal(['Apple', 'Banana', 'Cherry']);
  effectLog = signal('');

  constructor(private appRef: ApplicationRef, private cdRef: ChangeDetectorRef) {
    effect(() => {
      this.effectLog.set(`Count changed to: ${this.count().value}`);
    });
  }

  increment() {
    this.count.update(c => ({ value: c.value + 1 }));
  }

  updateUserAge() {
    this.user.update(user => ({ ...user, age: user.age + 1 }));
  }

  updateEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    this.email.set(input.value);
  }

  toggleList() {
    this.showList.update(show => !show);
  }

  forceUpdate() {
    this.cdRef.detectChanges();
  }

  markForCheck() {
    this.cdRef.markForCheck();
  }

  forceGlobalUpdate() {
    this.appRef.tick();
  }
}
