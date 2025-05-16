import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css'
})

export class TemplateFormComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  onSubmit(value) {
    console.log('Form submitted:', this.user);
  }
} 