import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
