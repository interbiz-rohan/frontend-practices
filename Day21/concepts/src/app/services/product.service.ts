import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, catchError, switchMap, tap } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private cartSubject = new BehaviorSubject<Product[]>([]);
  public cart$ = this.cartSubject.asObservable();

  private filterSubject = new BehaviorSubject<string>('');
  public filter$ = this.filterSubject.asObservable();

  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics', stock: 10 },
    { id: 2, name: 'Smartphone', price: 699, category: 'Electronics', stock: 15 },
    { id: 3, name: 'Headphones', price: 199, category: 'Electronics', stock: 20 },
    { id: 4, name: 'T-shirt', price: 29, category: 'Clothing', stock: 50 },
    { id: 5, name: 'Jeans', price: 79, category: 'Clothing', stock: 30 }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(
      delay(1000), 
      catchError(error => throwError(() => new Error('Failed to fetch products')))
    );
  }

  getFilteredProducts(): Observable<Product[]> {
    return this.filter$.pipe(
      switchMap(filter => {
        return this.getProducts().pipe(
          map(products => 
            filter ? products.filter(p => 
              p.name.toLowerCase().includes(filter.toLowerCase()) ||
              p.category.toLowerCase().includes(filter.toLowerCase())
            ) : products
          )
        );
      })
    );
  }

  addToCart(product: Product): void {
    const currentCart = this.cartSubject.value;
    this.cartSubject.next([...currentCart, product]);
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cartSubject.value;
    this.cartSubject.next(currentCart.filter(p => p.id !== productId));
  }

  setFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  getCartTotal(): Observable<number> {
    return this.cart$.pipe(
      map(cart => cart.reduce((total, product) => total + product.price, 0))
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    return of(this.products).pipe(
      delay(500),
      map(products => 
        products.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }
} 