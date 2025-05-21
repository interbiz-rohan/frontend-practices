import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';

@Component({
  selector: 'app-task',
  template: '<h4>{{value.value}}</h4>',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() value!: { value: number };
  @Output() setValue = new EventEmitter<{ value: number }>();
}
