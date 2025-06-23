import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as EventsActions from './store/landing.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
        this.store.dispatch(EventsActions.loadEvents());
  }

}
