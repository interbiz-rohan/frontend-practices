import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthDirective } from '../auth.directive';



@NgModule({
  declarations: [
    AuthDirective
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
