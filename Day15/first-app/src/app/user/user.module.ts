import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,    // For *ngIf, *ngFor
    FormsModule      // For [(ngModel)]
  ],
  exports: [
    UserListComponent
  ]
})
export class UserModule { } 