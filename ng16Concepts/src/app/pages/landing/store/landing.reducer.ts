import { createReducer, on } from '@ngrx/store';
import * as EventsActions from './landing.actions';
import { EventModel } from '../event.model';

export interface EventsState {
  events: EventModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

export const eventsReducer = createReducer(
  initialState,

  on(EventsActions.loadEvents, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(EventsActions.loadEventsSuccess, (state, { events }) => ({
    ...state,
    loading: false,
    events,
  })),

  on(EventsActions.loadEventsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
