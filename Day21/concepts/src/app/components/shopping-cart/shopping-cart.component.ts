import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems: Product[] = [];
  cartTotal: number = 0;
  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItems = items;
      });

    this.productService.getCartTotal()
      .pipe(takeUntil(this.destroy$))
      .subscribe(total => {
        this.cartTotal = total;
      });
  }

  removeFromCart(productId: number) {
    this.productService.removeFromCart(productId);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
} 