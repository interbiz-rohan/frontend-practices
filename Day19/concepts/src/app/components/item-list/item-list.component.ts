import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Item } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchTerm: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  selectedItem: Item | null = null;
  categories: string[] = [];
  editForm = {
    name: '',
    category: ''
  };
  
  private subscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.dataService.getItems().subscribe(items => {
        this.items = items;
        this.filterItems();
      })
    );
    this.categories = this.dataService.getCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addItem(name: string): void {
    if (name.trim()) {
      this.dataService.addItem(name);
    }
  }

  removeItem(id: number): void {
    this.dataService.removeItem(id);
    if (this.selectedItem?.id === id) {
      this.cancelEdit();
    }
  }

  editItem(id: number): void {
    const item = this.dataService.getItemById(id);
    if (item) {
      this.selectedItem = item;
      this.editForm = {
        name: item.name,
        category: item.category
      };
    }
  }

  saveEdit(): void {
    if (this.selectedItem && this.editForm.name.trim()) {
      this.dataService.updateItem(this.selectedItem.id, {
        name: this.editForm.name,
        category: this.editForm.category
      });
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.selectedItem = null;
    this.editForm = {
      name: '',
      category: ''
    };
  }

  filterItems(): void {
    if (this.searchTerm) {
      this.filteredItems = this.dataService.searchItems(this.searchTerm);
    } else {
      this.filteredItems = [...this.items];
    }
    this.sortItems();
  }

  sortItems(): void {
    this.filteredItems.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  toggleComplete(id: number): void {
    this.dataService.toggleItemComplete(id);
  }
} 