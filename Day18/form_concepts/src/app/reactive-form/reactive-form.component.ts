import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent implements OnInit {
  @Input() config: any[] = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your name' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Age', name: 'age', type: 'number', placeholder: 'Enter your age' },
    { label: 'Last Company', name: 'lastCompany', type: 'text', placeholder: 'Enter your last company' },
    { label: 'Salary', name: 'salary', type: 'number', placeholder: 'Enter your salary' },
    { label: 'Date of Birth', name: 'dateOfBirth', type: 'date', placeholder: 'Enter your date of birth' },
    { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Enter your phone number' },
    { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter your address' },
    { label: 'City', name: 'city', type: 'text', placeholder: 'Enter your city' },
    { label: 'Country', name: 'country', type: 'text', placeholder: 'Enter your country' }
  ];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const group: any = {};
    this.config.forEach(field => {
      group[field.name] = new FormControl('');
    });
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      alert('Form Submitted!\n' + JSON.stringify(this.form.value, null, 2));
    } else {
      this.form.markAllAsTouched();
    }
  }
}
