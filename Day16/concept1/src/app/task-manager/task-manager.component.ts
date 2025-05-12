import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
}

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent {
  // Basic Directives
  message = 'Hello World';

  // Event Binding
  clickCount = 0;

  // NgModel
  username = '';

  // NgIf
  isVisible = true;

  // NgFor
  items = [
    { id: 1, name: 'Item 1', status: 'active' },
    { id: 2, name: 'Item 2', status: 'inactive' },
    { id: 3, name: 'Item 3', status: 'active' }
  ];

  // NgSwitch
  currentRole = 'user';

  // NgClass
  isActive = true;
  isDisabled = false;

  // NgStyle
  textColor = 'blue';
  fontSize = 16;

  // Task List
  tasks: Task[] = [];
  newTaskTitle = '';

  onClick() {
    this.clickCount++;
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.tasks.push({
        id: Date.now(),
        title: this.newTaskTitle.trim()
      });
      this.newTaskTitle = '';
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
} 