import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventsState } from './landing.reducer';

export const selectEventsState = createFeatureSelector<EventsState>('events');

export const selectAllEvents = createSelector(
  selectEventsState,
  (state) => state.events
);

export const selectLoading = createSelector(
  selectEventsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectEventsState,
  (state) => state.error
);
