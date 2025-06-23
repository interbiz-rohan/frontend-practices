import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as EventsActions from './landing.actions';
import { EventModel } from '../event.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class EventsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.loadEvents),
      mergeMap(() =>
        this.http
          .get<EventModel[]>('https://6857ce8321f5d3463e563f6d.mockapi.io/api/v1/events')
          .pipe(
            map((events) => {
                console.log('Events loaded:', events);
                return EventsActions.loadEventsSuccess({ events })}),
            catchError((error) =>
              of(EventsActions.loadEventsFailure({ error: error.message }))
            )
          )
      )
    )
  );
}
