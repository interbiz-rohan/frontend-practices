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
  InjectionToken
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Define logger injection token
export const LOGGER = new InjectionToken<any>('Logger');

// Custom Method Decorator
function LogMethod() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`Calling ${propertyKey} with`, args);
      const result = originalMethod.apply(this, args);
      console.log(`Result:`, result);
      return result;
    };

    return descriptor;
  };
}

// Custom Property Decorator
function Required() {
  return function (target: any, propertyKey: string) {
    let value: any;
    const getter = function() {
      return value;
    };
    const setter = function(newVal: any) {
      if (!newVal || newVal.trim() === '') {
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

@Component({
  selector: 'app-decorator-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="decorator-demo">
      <h2>Decorator Demo</h2>

      <!-- Input/Output Demo -->
      <section class="demo-section">
        <h3>Input/Output Demo</h3>
        <div class="input-demo">
          <input [(ngModel)]="inputValue" 
                 (ngModelChange)="onInputChange($event)"
                 placeholder="Type something...">
          <p>Current value: {{inputValue}}</p>
        </div>
        <button (click)="emitEvent()">Emit Event</button>
      </section>

      <!-- HostListener Demo -->
      <section class="demo-section">
        <h3>HostListener Demo</h3>
        <div class="mouse-tracker">
          Mouse Position: X: {{mouseX}}, Y: {{mouseY}}
        </div>
        <div class="scroll-tracker">
          Scroll Position: {{scrollPosition}}
        </div>
      </section>

      <!-- ViewChild Demo -->
      <section class="demo-section">
        <h3>ViewChild Demo</h3>
        <div class="view-child-demo">
          <input #demoElement type="text" placeholder="This is a ViewChild element">
        </div>
        <button (click)="focusElement()">Focus Input</button>
      </section>

      <!-- Custom Decorator Demo -->
      <section class="demo-section">
        <h3>Custom Decorator Demo</h3>
        <div class="custom-decorator-demo">
          <input [(ngModel)]="requiredValue" 
                 (ngModelChange)="validateRequired()"
                 placeholder="Required field">
          <p *ngIf="validationMessage" [class.error]="validationMessage.includes('required')">{{validationMessage}}</p>
        </div>
      </section>

      <!-- Lifecycle Hooks Demo -->
      <section class="demo-section">
        <h3>Lifecycle Hooks Demo</h3>
        <div class="lifecycle-demo">
          <p>Component initialized: {{isInitialized}}</p>
          <p>Destroyed: {{isDestroyed}}</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .decorator-demo {
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

    .mouse-tracker, .scroll-tracker {
      padding: 1rem;
      background-color: #f8f9fa;
      margin: 1rem 0;
      border-radius: 4px;
    }

    .view-child-demo {
      padding: 1rem;
      background-color: #e9ecef;
      margin: 1rem 0;
      border-radius: 4px;
    }

    .custom-decorator-demo {
      padding: 1rem;
      background-color: #fff3cd;
      margin: 1rem 0;
      border-radius: 4px;
    }

    .lifecycle-demo {
      padding: 1rem;
      background-color: #d4edda;
      margin: 1rem 0;
      border-radius: 4px;
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
      margin: 0.5rem 0;
    }

    button:hover {
      background-color: #0056b3;
    }

    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
  `]
})
export class DecoratorDemoComponent implements OnInit, OnDestroy {
  // Input/Output Decorators
  @Input() initialValue: string = '';
  @Output() valueChange = new EventEmitter<string>();
   
  
  // ViewChild Decorator
  @ViewChild('demoElement') demoElement!: ElementRef;

  // HostListener Decorators
  mouseX: number = 0;
  mouseY: number = 0;
  scrollPosition: number = 0;

  // Custom Property Decorator
  @Required()
  requiredValue: string = '';

  // Regular properties
  inputValue: string = '';
  validationMessage: string = '';
  isInitialized: boolean = false;
  isDestroyed: boolean = false;

  // Constructor with Inject and Optional
  constructor(
    @Inject('API_URL') private apiUrl: string,
    @Optional() @Inject(LOGGER) private logger?: any
  ) {
    console.log('API URL:', this.apiUrl);
    if (this.logger) {
      this.logger.log('Component constructed');
    }
  }

  // Lifecycle Hooks
  ngOnInit() {
    this.isInitialized = true;
    console.log('Component initialized');
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    console.log('Component destroyed');
  }

  // HostListener Decorators
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrollPosition = window.scrollY;
  }

  // Custom Method Decorator
  @LogMethod()
  onInputChange(value: string) {
    this.inputValue = value;
    this.valueChange.emit(value);
    return `Processed: ${value}`;
  }

  // Regular methods
  emitEvent() {
    this.valueChange.emit(this.inputValue);
  }

  focusElement() {
    if (this.demoElement) {
      this.demoElement.nativeElement.focus();
    }
  }

  validateRequired() {
    try {
      // Let the @Required decorator handle the validation
      this.requiredValue = this.requiredValue;
      this.validationMessage = 'Validation successful!';
    } catch (error) {
      this.validationMessage = error instanceof Error ? error.message : 'Validation failed';
    }
  }
} 