import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TemplateFormComponent,ReactiveFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'form_concepts';
}
