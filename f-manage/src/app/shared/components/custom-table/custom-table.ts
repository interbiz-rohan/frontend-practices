import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TooltipDirective } from '../tooltip/tooltip';

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
  tooltip?: string;
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
    MatProgressSpinnerModule,
    TooltipDirective
  ]
})
export class CustomTableComponent {
  // Input signals
  private _columns = signal<TableColumn[]>([]);
  private _data = signal<any[]>([]);
  private _totalItems = signal<number>(0);
  private _currentPage = signal<number>(1);
  private _pageSize = signal<number>(5);
  private _actions = signal<TableAction[]>([]);
  private _loading = signal<boolean>(false);
  private _emptyMessage = signal<string>('No data available');

  // Computed values
  get displayedColumns() {
    return [
      ...this._columns().map(col => col.key),
      ...(this._actions().length > 0 ? ['actions'] : [])
    ];
  }

  get totalPages() {
    return Math.ceil(this._totalItems() / this._pageSize());
  }

  get paginationPages() {
    const pages: (number | string)[] = [];
    const total = this.totalPages;
    const current = this._currentPage();

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

  // Input setters
  @Input() set columns(value: TableColumn[]) { this._columns.set(value); }
  @Input() set data(value: any[]) { this._data.set(value); }
  @Input() set totalItems(value: number) { this._totalItems.set(value); }
  @Input() set currentPage(value: number) { this._currentPage.set(value); }
  @Input() set pageSize(value: number) { this._pageSize.set(value); }
  @Input() set actions(value: TableAction[]) { this._actions.set(value); }
  @Input() set loading(value: boolean) { this._loading.set(value); }
  @Input() set emptyMessage(value: string) { this._emptyMessage.set(value); }

  // Outputs
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() actionClick = new EventEmitter<{ action: string; item: any }>();

  get data() { return this._data(); }
  get loading() { return this._loading(); }
  get emptyMessage() { return this._emptyMessage(); }
  get currentPage() { return this._currentPage(); }
  get pageSize() { return this._pageSize(); }
  get actions() { return this._actions(); }
  get columns() { return this._columns(); }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this._currentPage()) return;
    this.onPageChange({ pageIndex: page - 1, pageSize: this._pageSize(), length: this._totalItems() });
  }

  onPageSizeChange(event: Event) {
    const newSize = +(event.target as HTMLSelectElement).value;
    this._currentPage.set(1);
    this.pageChange.emit({ pageIndex: 0, pageSize: newSize, length: this._totalItems() });
  }

  onActionClick(action: string, item: any) {
    this.actionClick.emit({ action, item });
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  getDefaultTooltip(action: string): string {
    const tooltips: { [key: string]: string } = {
      'edit': 'Edit this item',
      'delete': 'Delete this item',
      'view': 'View details',
      'download': 'Download file',
    };
    return tooltips[action] || action.charAt(0).toUpperCase() + action.slice(1);
  }
}
