import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
  standalone: true
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    const digits = value.replace(/\D/g, '');
    
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    
    return value;
  }
} 