import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl:  './page-loader.html',
  styleUrls: ['./page-loader.scss'],
})
export class PageLoaderComponent {
  isLoading = input<boolean>(false);
}
