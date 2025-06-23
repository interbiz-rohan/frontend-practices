import { createAction, props } from '@ngrx/store';
import { EventModel } from '../event.model';

export const loadEvents = createAction('[Events] Load Events');

export const loadEventsSuccess = createAction(
  '[Events] Load Events Success',
  props<{ events: EventModel[] }>()
);

export const loadEventsFailure = createAction(
  '[Events] Load Events Failure',
  props<{ error: string }>()
);
