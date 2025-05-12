import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  HostListener, 
  ViewChild, 
  ElementRef,
  OnInit,
  OnDestroy,
  Inject,
  Optional,
  InjectionToken,
  HostBinding,
  Attribute,
  Self,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Custom Decorators
function Log() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`Calling ${propertyKey} with:`, args);
      const result = originalMethod.apply(this, args);
      console.log(`${propertyKey} returned:`, result);
      return result;
    };
    return descriptor;
  };
}

function Required() {
  return function (target: any, propertyKey: string) {
    let value: any;
    const getter = function() {
      return value;
    };
    const setter = function(newVal: any) {
      if (!newVal) {
        throw new Error(`${propertyKey} is required`);
      }
      value = newVal;
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

function Debounce(ms: number = 300) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let timeout: any;
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => original.apply(this, args), ms);
    };
    return descriptor;
  };
}

// Injection Tokens
export const LOGGER = new InjectionToken<any>('Logger');
export const CONFIG = new InjectionToken<any>('Config');
export const SELF_SERVICE = new InjectionToken<any>('SelfService');
export const PARENT_SERVICE = new InjectionToken<any>('ParentService');

@Component({
  selector: 'app-decorator-examples',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="decorator-examples">
      <h2>Advanced Decorator Examples</h2>

      <!-- Property Decorators -->
      <section class="demo-section">
        <h3>Property Decorators</h3>
        <div class="demo-content">
          <input [(ngModel)]="requiredField" 
                 placeholder="Required field"
                 (ngModelChange)="validateField()">
          <p *ngIf="validationMessage" [class.error]="validationMessage.includes('required')">
            {{ validationMessage }}
          </p>
        </div>
      </section>

      <!-- Method Decorators -->
      <section class="demo-section">
        <h3>Method Decorators</h3>
        <div class="demo-content">
          <button (click)="debouncedMethod()">Debounced Click</button>
          <p>Click count: {{ clickCount }}</p>
          <button (click)="loggedMethod('test')">Logged Method</button>
        </div>
      </section>

      <!-- Host Decorators -->
      <section class="demo-section">
        <h3>Host Decorators</h3>
        <div class="demo-content" 
             #hostElement
             [class.active]="isActive"
             (mouseenter)="onMouseEnter()"
             (mouseleave)="onMouseLeave()">
          <p>Mouse position: X: {{ mouseX }}, Y: {{ mouseY }}</p>
          <p>Scroll position: {{ scrollPosition }}</p>
          <p>Host class: {{ hostClass }}</p>
        </div>
      </section>

      <!-- Dependency Injection -->
      <section class="demo-section">
        <h3>Dependency Injection</h3>
        <div class="demo-content">
          <p>API URL: {{ apiUrl }}</p>
          <p>Config: {{ config | json }}</p>
          <p>Logger status: {{ loggerStatus }}</p>
          <p>Version: {{ version }}</p>
          <p>Self Service: {{ selfServiceStatus }}</p>
          <p>Parent Service: {{ parentServiceStatus }}</p>
        </div>
      </section>

      <!-- Lifecycle Hooks -->
      <section class="demo-section">
        <h3>Lifecycle Hooks</h3>
        <div class="demo-content">
          <p>Initialized: {{ isInitialized }}</p>
          <p>Destroyed: {{ isDestroyed }}</p>
          <button (click)="toggleComponent()">Toggle Component</button>
        </div>
      </section>

      <!-- ViewChild Example -->
      <section class="demo-section">
        <h3>ViewChild Example</h3>
        <div class="demo-content">
          <div #contentElement class="content-box">
            This is a ViewChild element
          </div>
          <button (click)="focusElement()">Focus Element</button>
          <button (click)="changeContent()">Change Content</button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .decorator-examples {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .demo-section {
      margin-bottom: 2rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .demo-content {
      padding: 1rem;
      background-color: #f8f9fa;
      margin: 1rem 0;
      border-radius: 4px;
    }

    .content-box {
      padding: 1rem;
      background-color: #e9ecef;
      margin: 1rem 0;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .content-box:focus {
      outline: 2px solid #007bff;
      background-color: #fff;
    }

    .active {
      background-color: #d4edda !important;
    }

    .error {
      color: #dc3545;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      margin: 0.5rem 0;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin: 0.5rem;
    }

    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class DecoratorExamplesComponent implements OnInit, OnDestroy {
  // Property Decorators
  @Required()
  requiredField: string = '';

  // Host Decorators
  @HostBinding('class.active')
  isActive: boolean = false;

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrollPosition = window.scrollY;
  }

  // ViewChild Decorator
  @ViewChild('contentElement') contentElement!: ElementRef;
  @ViewChild('hostElement') hostElement!: ElementRef;

  // Regular properties
  validationMessage: string = '';
  clickCount: number = 0;
  mouseX: number = 0;
  mouseY: number = 0;
  scrollPosition: number = 0;
  hostClass: string = '';
  isInitialized: boolean = false;
  isDestroyed: boolean = false;
  loggerStatus: string = 'Not initialized';
  selfServiceStatus: string = 'Not available';
  parentServiceStatus: string = 'Not available';

  // Constructor with various injection types
  constructor(
    @Inject('API_URL') public apiUrl: string,
    @Inject(CONFIG) public config: any,
    @Optional() @Inject(LOGGER) private logger?: any,
    @Attribute('data-version') public version?: string,
    @Self() @Inject(SELF_SERVICE) private selfService?: any,
    @SkipSelf() @Inject(PARENT_SERVICE) private parentService?: any
  ) {
    if (this.logger) {
      this.loggerStatus = 'Initialized';
      this.logger.log('Component constructed');
    }
    if (this.selfService) {
      this.selfServiceStatus = 'Available';
    }
    if (this.parentService) {
      this.parentServiceStatus = 'Available';
    }
  }

  // Lifecycle Hooks
  ngOnInit() {
    this.isInitialized = true;
    this.hostClass = this.hostElement?.nativeElement?.className || '';
    console.log('Component initialized');
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    console.log('Component destroyed');
  }

  // Method Decorators
  @Debounce(500)
  debouncedMethod() {
    this.clickCount++;
    console.log('Debounced method called');
  }

  @Log()
  loggedMethod(param: string) {
    console.log('Logged method called with:', param);
    return `Processed: ${param}`;
  }

  // Regular methods
  validateField() {
    try {
      this.requiredField = this.requiredField;
      this.validationMessage = 'Validation successful!';
    } catch (error) {
      this.validationMessage = error instanceof Error ? error.message : 'Validation failed';
    }
  }

  onMouseEnter() {
    this.isActive = true;
  }

  onMouseLeave() {
    this.isActive = false;
  }

  focusElement() {
    if (this.contentElement) {
      this.contentElement.nativeElement.focus();
    }
  }

  changeContent() {
    if (this.contentElement) {
      this.contentElement.nativeElement.textContent = 'Content changed at: ' + new Date().toLocaleTimeString();
    }
  }

  toggleComponent() {
    // This would typically be handled by a parent component
    console.log('Toggle requested');
  }
} 