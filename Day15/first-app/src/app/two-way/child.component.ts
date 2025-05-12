import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h3>👶 Child Component</h3>
    <input [(ngModel)]="childNameInternal" (ngModelChange)="onNameChange($event)" />
    <p>Child says: Hi, {{ childNameInternal }}!</p>
  `
})
export class ChildComponent {
  @Input() childName = '';
  @Output() childNameChange = new EventEmitter<string>();

  get childNameInternal() {
    return this.childName;
  }

  set childNameInternal(value: string) {
    this.childName = value;
    this.childNameChange.emit(value);
  }

  onNameChange(value: string) {
    this.childNameChange.emit(value);
  }
}
