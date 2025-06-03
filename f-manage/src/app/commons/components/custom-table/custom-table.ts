import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'number' | 'action';
  sortable?: boolean;
  width?: string;
  customClass?: string;
}

export interface TableAction {
  label: string;
  icon?: string;
  action: string;
  class?: string;
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.html',
  styleUrls: ['./custom-table.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class CustomTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() actions: TableAction[] = [];
  @Input() loading: boolean = false;
  @Input() emptyMessage: string = 'No data available';

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() actionClick = new EventEmitter<{action: string, item: any}>();

  displayedColumns: string[] = [];

  ngOnChanges() {
    this.updateDisplayedColumns();
  }

  private updateDisplayedColumns() {
    this.displayedColumns = [
      ...this.columns.map(col => col.key),
      ...(this.actions.length > 0 ? ['actions'] : [])
    ];
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  onActionClick(action: string, item: any): void {
    this.actionClick.emit({ action, item });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
