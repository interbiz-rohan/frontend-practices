import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="child-component">
      <h3>Child Component</h3>
      <p>Input Data: {{ data }}</p>
      <p>Last Updated: {{ lastUpdated | date:'medium' }}</p>
    </div>
  `,
  styles: [`
    .child-component {
      padding: 15px;
      background: #e3f2fd;
      border-radius: 4px;
      margin: 10px 0;
    }
  `]
})
export class ChildComponentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: string = '';
  lastUpdated: Date = new Date();

  constructor() {
    console.log('Child: constructor called');
  }

  ngOnInit() {
    console.log('Child: ngOnInit called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Child: ngOnChanges called');
    if (changes['data']) {
      this.lastUpdated = new Date();
      console.log(`Child: data changed from ${changes['data'].previousValue} to ${changes['data'].currentValue}`);
    }
  }

  ngOnDestroy() {
    console.log('Child: ngOnDestroy called');
  }
} 