import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, concatMap, delay, exhaustMap, forkJoin, from, mergeMap, of, ReplaySubject, Subject, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ShoppingCartComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>E-Commerce Demo</h1>
      </header>
      
      <main>
        <div class="content">
          <app-product-list></app-product-list>
        </div>
        
        <aside class="cart-sidebar">
          <app-shopping-cart></app-shopping-cart>
        </aside>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: #f8f9fa;
    }
    
    header {
      background: #343a40;
      color: white;
      padding: 1rem;
      text-align: center;
    }
    
    main {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 20px;
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .content {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .cart-sidebar {
      position: sticky;
      top: 20px;
    }
    
    @media (max-width: 768px) {
      main {
        grid-template-columns: 1fr;
      }
      
      .cart-sidebar {
        position: static;
      }
    }
  `]
})
export class AppComponent {
  title = 'rxjs-ecommerce-demo';
  observ$ = new Subject<number>();
  constructor() {
const bs = new BehaviorSubject<string>('BSH');

    forkJoin(
      {
        ob1: of(12),
        sub1: bs.asObservable()
      }
    ).subscribe({
      next:(value)=> console.log(value)}
    );

    bs.complete(); // now forkJoin will emit

  }
}
