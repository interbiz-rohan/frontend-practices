import { Component } from '@angular/core';
import { UserListComponent } from '../user/user-list/user-list.component';
import { HelloComponent } from '../hello/hello.component';
import {TwoWayBinding} from '../two-way/twoWayBinding.component'
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [UserListComponent, HelloComponent,TwoWayBinding],
  templateUrl: './layout.component.html',
  styleUrls:["./layout.component.css"]
})

export class LayoutComponent {
  title = 'angular-demo';
}
 