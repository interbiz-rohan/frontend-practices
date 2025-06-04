import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true
})
export class HeaderComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

}