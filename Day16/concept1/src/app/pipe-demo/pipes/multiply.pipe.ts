import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiply',
  standalone: true
})
export class MultiplyPipe implements PipeTransform {
  transform(value: number, factor: number = 1): number {
    return value * factor;
  }
} 