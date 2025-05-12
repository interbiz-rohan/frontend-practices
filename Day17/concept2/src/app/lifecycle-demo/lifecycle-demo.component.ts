import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, AfterContentInit, AfterViewChecked, AfterContentChecked, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildComponentComponent } from './child-component/child-component.component';

@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ChildComponentComponent],
  template: `
    <div class="lifecycle-container">
      <h2>Lifecycle Hooks Demo</h2>
      
      <div class="controls">
        <button (click)="updateCounter()">Update Counter</button>
        <button (click)="toggleChild()">Toggle Child Component</button>
        <input [(ngModel)]="inputValue" pl
        aceholder="Type something...">
      </div>

      <div class="logs">
        <h3>Lifecycle Logs:</h3>
        <div *ngFor="let log of logs" [class]="log.type">
          {{ log.message }}
        </div>
      </div>

      <div *ngIf="showChild">
        <app-child-component [data]="inputValue"></app-child-component>
      </div>
    </div>
  `,
  styles: [`
    .lifecycle-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .controls {
      margin: 20px 0;
      display: flex;
      gap: 10px;
    }
    .logs {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 4px;
      margin: 20px 0;
    }
    .log {
      margin: 5px 0;
      padding: 5px;
      border-left: 3px solid #ccc;
    }
    .ngOnInit { border-left-color: #4CAF50; }
    .ngOnChanges { border-left-color: #2196F3; }
    .ngAfterViewInit { border-left-color: #FF9800; }
    .ngAfterContentInit { border-left-color: #9C27B0; }
    .ngAfterViewChecked { border-left-color: #FF5722; }
    .ngAfterContentChecked { border-left-color: #607D8B; }
    .ngOnDestroy { border-left-color: #F44336; }
  `]
})
export class LifecycleDemoComponent implements 
  OnInit, 
  OnChanges, 
  OnDestroy, 
  AfterViewInit, 
  AfterContentInit,
  AfterViewChecked,
  AfterContentChecked {
  
  @Input() initialValue: string = '';
  inputValue: string = '';
  counter: number = 0;
  showChild: boolean = true;
  logs: { message: string; type: string }[] = [];

  constructor() {
    this.log('constructor called');
  }

  private log(message: string) {
    const type = message.split(' ')[0].toLowerCase();
    this.logs.unshift({ message, type });
    console.log(message);
  }

  updateCounter() {
    this.counter++;
    this.log(`Counter updated to: ${this.counter}`);
  }

  toggleChild() {
    this.showChild = !this.showChild;
    this.log(`Child component ${this.showChild ? 'shown' : 'hidden'}`);
  }

  

  ngOnChanges(changes: SimpleChanges) {
    this.log('ngOnChanges called');
    if (changes['initialValue']) {
      this.log(`initialValue changed from ${changes['initialValue'].previousValue} to ${changes['initialValue'].currentValue}`);
    }
  }

  ngAfterViewInit() {
    this.log('ngAfterViewInit called');
  }

  ngAfterContentInit() {
    this.log('ngAfterContentInit called');
  }

  ngAfterViewChecked() {
    this.log('ngAfterViewChecked called');
  }

  ngAfterContentChecked() {
    this.log('ngAfterContentChecked called');
  }

  ngOnDestroy() {
    this.log('ngOnDestroy called');
  }

  ngOnInit() {
    this.log('ngOnInit called');
  }
} 