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

  get paginationPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 4) pages.push('...');
      for (let i = Math.max(2, current - 2); i <= Math.min(total - 1, current + 2); i++) {
        pages.push(i);
      }
      if (current < total - 3) pages.push('...');
      pages.push(total);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.onPageChange({ pageIndex: page - 1, pageSize: this.pageSize, length: this.totalItems });
  }

  onPageSizeChange(event: Event) {
    const newSize = +(event.target as HTMLSelectElement).value;
    this.pageChange.emit({ pageIndex: 0, pageSize: newSize, length: this.totalItems });
  }
}
