import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: false // Make it impure to handle mutable data
})
export class FilterPipe implements PipeTransform {
  transform(items: string[], searchTerm: string): string[] {
    if (!items || !searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => 
      item.toLowerCase().includes(searchTerm)
    );
  }
} 