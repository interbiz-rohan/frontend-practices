import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

// Material Imports
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Material Modules
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Angular Material Showcase</span>
    </mat-toolbar>

    <div class="container">
      <!-- Badge -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Badge</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <button mat-raised-button color="primary" (click)="toggleBadgeVisibility()">
            Toggle Badge
            <span matBadge="4" matBadgeOverlap="false">Notifications</span>
          </button>
        </mat-card-content>
      </mat-card>

      <!-- Button -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Button</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <button mat-button>Basic</button>
          <button mat-raised-button color="primary">Primary</button>
          <button mat-raised-button color="accent">Accent</button>
          <button mat-raised-button color="warn">Warn</button>
        </mat-card-content>
      </mat-card>

      <!-- Button Toggle -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Button Toggle</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-button-toggle-group [formControl]="fontStyleControl">
            <mat-button-toggle value="bold">Bold</mat-button-toggle>
            <mat-button-toggle value="italic">Italic</mat-button-toggle>
            <mat-button-toggle value="underline">Underline</mat-button-toggle>
          </mat-button-toggle-group>
        </mat-card-content>
      </mat-card>

      <!-- Checkbox -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Checkbox</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-checkbox [(ngModel)]="checked">Check me!</mat-checkbox>
        </mat-card-content>
      </mat-card>

      <!-- Chips -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Chips</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-chip-set>
            <mat-chip *ngFor="let chip of chips">{{chip}}</mat-chip>
          </mat-chip-set>
        </mat-card-content>
      </mat-card>

      <!-- Datepicker -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Datepicker</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field>
            <mat-label>Choose a date</mat-label>
            <input matInput [matDatepicker]="picker">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
        </mat-card-content>
      </mat-card>

      <!-- Expansion Panel -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Expansion Panel</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-expansion-panel [(expanded)]="panelOpenState">
            <mat-expansion-panel-header>
              <mat-panel-title>Self aware panel</mat-panel-title>
              <mat-panel-description>Currently I am {{panelOpenState ? 'open' : 'closed'}}</mat-panel-description>
            </mat-expansion-panel-header>
            <p>I'm visible because I am open</p>
          </mat-expansion-panel>
        </mat-card-content>
      </mat-card>

      <!-- Form Field -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Form Field</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="fill">
            <mat-label>Input</mat-label>
            <input matInput placeholder="Placeholder">
            <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
            <mat-hint>Hint</mat-hint>
          </mat-form-field>
        </mat-card-content>
      </mat-card>

      <!-- List -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>List</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <mat-list-item>Item 1</mat-list-item>
            <mat-list-item>Item 2</mat-list-item>
            <mat-list-item>Item 3</mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>

      <!-- Menu -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Menu</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <button mat-button [matMenuTriggerFor]="menu">Menu</button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item>Item 1</button>
            <button mat-menu-item>Item 2</button>
          </mat-menu>
        </mat-card-content>
      </mat-card>

      <!-- Paginator -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Paginator</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-paginator [length]="100" [pageSize]="10" [pageSizeOptions]="[5, 10, 25, 100]">
          </mat-paginator>
        </mat-card-content>
      </mat-card>

      <!-- Progress Bar -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Progress Bar</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-progress-bar mode="determinate" value="50"></mat-progress-bar>
        </mat-card-content>
      </mat-card>

      <!-- Radio Button -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Radio Button</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-radio-group [(ngModel)]="favoriteSeason">
            <mat-radio-button value="spring">Spring</mat-radio-button>
            <mat-radio-button value="summer">Summer</mat-radio-button>
            <mat-radio-button value="autumn">Autumn</mat-radio-button>
            <mat-radio-button value="winter">Winter</mat-radio-button>
          </mat-radio-group>
        </mat-card-content>
      </mat-card>

      <!-- Slide Toggle -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Slide Toggle</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-slide-toggle>Slide me!</mat-slide-toggle>
        </mat-card-content>
      </mat-card>

      <!-- Slider -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Slider</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-slider min="1" max="100" step="1" [(ngModel)]="value">
            <input matSliderThumb>
          </mat-slider>
        </mat-card-content>
      </mat-card>

      <!-- Table -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Table</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="dataSource">
            <ng-container matColumnDef="position">
              <th mat-header-cell *matHeaderCellDef> No. </th>
              <td mat-cell *matCellDef="let element"> {{element.position}} </td>
            </ng-container>

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> Name </th>
              <td mat-cell *matCellDef="let element"> {{element.name}} </td>
            </ng-container>

            <ng-container matColumnDef="weight">
              <th mat-header-cell *matHeaderCellDef> Weight </th>
              <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
            </ng-container>

            <ng-container matColumnDef="symbol">
              <th mat-header-cell *matHeaderCellDef> Symbol </th>
              <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>

      <!-- Tabs -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Tabs</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-tab-group>
            <mat-tab label="First">Content 1</mat-tab>
            <mat-tab label="Second">Content 2</mat-tab>
            <mat-tab label="Third">Content 3</mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>

      <!-- Tooltip -->
      <mat-card class="component-card">
        <mat-card-header>
          <mat-card-title>Tooltip</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <button mat-raised-button matTooltip="Info about the action">Action</button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    mat-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }

    .container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
      max-width: 1200px;
      margin: 84px auto 20px;
    }

    .component-card {
      margin-bottom: 20px;
    }

    mat-card-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    mat-form-field {
      width: 100%;
    }

    table {
      width: 100%;
    }

    mat-slider {
      width: 100%;
    }

    mat-button-toggle-group {
      margin-bottom: 16px;
    }

    mat-radio-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    mat-chip-set {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  `]
})
export class AppComponent {
  // Badge
  hidden = false;
  badgeContent = 4; 

  // Button Toggle
  fontStyleControl = new FormControl('');

  // Checkbox
  checked = false;

  // Chips
  chips = ['Angular', 'Material', 'Components'];

  // Datepicker
  date = new Date();

  // Expansion Panel
  panelOpenState = false;

  // Radio
  favoriteSeason: string = '';

  // Slider
  value = 50;

  // Table
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  ];

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
