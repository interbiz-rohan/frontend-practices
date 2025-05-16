import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Item {
  id: number;
  name: string;
  category: string;
  createdAt: Date;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items: Item[] = [
    { id: 1, name: 'Apple', category: 'Fruits', createdAt: new Date(), isCompleted: false },
    { id: 2, name: 'Banana', category: 'Fruits', createdAt: new Date(), isCompleted: false },
    { id: 3, name: 'Carrot', category: 'Vegetables', createdAt: new Date(), isCompleted: false },
    { id: 4, name: 'Milk', category: 'Dairy', createdAt: new Date(), isCompleted: false }
  ];

  private itemsSubject = new BehaviorSubject<Item[]>(this.items);

  constructor() { }

  getItems(): Observable<Item[]> {
    return this.itemsSubject.asObservable();
  }

  getItemById(id: number): Item | undefined {
    return this.items.find(item => item.id === id);
  }

  addItem(name: string, category: string = 'Other'): void {
    const newItem: Item = {
      id: this.generateId(),
      name,
      category,
      createdAt: new Date(),
      isCompleted: false
    };
    this.items.push(newItem);
    this.itemsSubject.next(this.items);
  }

  updateItem(id: number, updates: Partial<Item>): void {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updates };
      this.itemsSubject.next(this.items);
    }
  }

  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.itemsSubject.next(this.items);
  }

  toggleItemComplete(id: number): void {
    const item = this.getItemById(id);
    if (item) {
      this.updateItem(id, { isCompleted: !item.isCompleted });
    }
  }

  getItemsByCategory(category: string): Item[] {
    return this.items.filter(item => item.category === category);
  }

  getCategories(): string[] {
    return [...new Set(this.items.map(item => item.category))];
  }

  searchItems(query: string): Item[] {
    const searchTerm = query.toLowerCase();
    return this.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    );
  }

  private generateId(): number {
    return Math.max(0, ...this.items.map(item => item.id)) + 1;
  }
} 