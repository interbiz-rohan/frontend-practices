import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IndexedDBService, User } from '../../../services/indexed-db.service';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-edit-user.html',
  styleUrls: ['./add-edit-user.scss']
})
export class AddEditUser implements OnInit {
  @Input() userId: string | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup;
  isEdit = false;
  loading = false;
  newEmail = '';
  newContact = '';
  newAddress = '';

  private fb = inject(FormBuilder);
  private dbService = inject(IndexedDBService);

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: this.fb.array([this.fb.control('', [Validators.required, Validators.email])]),
      contact: this.fb.array([this.fb.control('', Validators.required)]),
      address: this.fb.array([this.fb.control('', Validators.required)]),
      gender: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.userId) {
      this.isEdit = true;
      this.loading = true;
      this.dbService.getUserById(this.userId).subscribe(user => {
        if (user) {
          this.form.patchValue({
            name: user.name,
            gender: user.gender,
            password: user.password
          });
          this.setFormArray('email', user.email);
          this.setFormArray('contact', user.contact);
          this.setFormArray('address', user.address);
        }
        this.loading = false;
      });
    }
  }

  get email() { return this.form.get('email') as FormArray; }
  get contact() { return this.form.get('contact') as FormArray; }
  get address() { return this.form.get('address') as FormArray; }

  setFormArray(key: 'email' | 'contact' | 'address', values: string[]) {
    const arr = this.form.get(key) as FormArray;
    arr.clear();
    values.forEach(val => arr.push(this.fb.control(val, arr.controls[0].validator)));
  }

  addToArray(key: 'email' | 'contact' | 'address') {
    const arr = this.form.get(key) as FormArray;
    arr.push(this.fb.control('', arr.controls[0].validator));
  }

  removeFromArray(key: 'email' | 'contact' | 'address', idx: number) {
    const arr = this.form.get(key) as FormArray;
    if (arr.length > 1) arr.removeAt(idx);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.value;
    if (this.isEdit) {
      this.dbService.updateUser(this.userId!, value).subscribe(() => this.saved.emit());
    } else {
      this.dbService.addUser(value).subscribe(() => this.saved.emit());
    }
  }

  close() {
    this.closed.emit();
  }
}
