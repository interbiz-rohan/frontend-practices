import { Component } from '@angular/core';
import { delay, filter, forkJoin, interval, map, merge, mergeMap, Observable, of, ReplaySubject, take, timer } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  stream1$ = interval(1000).pipe(take(3), map(val => `Cart Update: ${val}`));
  stream2$ = interval(500).pipe(take(4), map(val => `Wishlist Update: ${val}`));

  constructor() {

    merge(this.stream1$, this.stream2$).subscribe(console.log);

    forkJoin({
      user: of({ name: 'Alice' }).pipe(delay(1000)),
      orders: of(['item1', 'item2']).pipe(delay(2000))
    }).subscribe(result => console.log(result));

    of(1, 2, 3, 4, 5).pipe(
      mergeMap(x => of(x).pipe(delay(2000))),
      filter(value=>value%2==0)
    ).subscribe(console.log);
  }

}
