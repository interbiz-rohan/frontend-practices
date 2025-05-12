import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child.component';

@Component({
  selector: 'two-way-binding',
  standalone: true,
  imports: [FormsModule, ChildComponent],
  template: `
    <h2>Parent Component</h2>
    <input [(ngModel)]="name" />
    <p>Parent says: Hello, {{ name }}!</p>
    <app-child [childName]="name" (childNameChange)="name = $event"></app-child>
  `
})

export class TwoWayBinding {
  name = 'Angular Dev';
}
