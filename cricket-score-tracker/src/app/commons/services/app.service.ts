// write here

import { effect, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { tap, finalize, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { ApiResponse, Series, Match } from '../interfaces/cricket.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private searchSubject = new Subject<string>();
  private _series = new BehaviorSubject<Series[]>([]);
  private _selectedSeries = new BehaviorSubject<string | null>(null);
  private _selectedMatch = new BehaviorSubject<string | null>(null);
  private _currentMatchData = new BehaviorSubject<Match | null>(null);
  private _activeScorecardTeam = new BehaviorSubject<string>('Australia');

  isLoading = signal<boolean>(false);

  series$: Observable<Series[]> = this._series.asObservable();
  selectedSeries$: Observable<string | null> = this._selectedSeries.asObservable();
  selectedMatch$: Observable<string | null> = this._selectedMatch.asObservable();
  currentMatchData$: Observable<Match | null> = this._currentMatchData.asObservable();
  activeScorecardTeam$: Observable<string> = this._activeScorecardTeam.asObservable();

  constructor(private apiService: ApiService) {
    console.log('api hits here');
    effect(() => {
      console.log("Loader -", this.isLoading())
    });
  }

  searchSeries(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  setSeries(series: Series[]): void {
    this._series.next(series);
  }


  setSelectedMatch(id: string) {
    this._selectedMatch.next(id);
    this.fetchMatchData(id);
  }


  fetchMatchData(id: string) {
    this.isLoading.set(true);
    this.apiService
      .getSelectedMatchData(id)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((response) => {
        this._currentMatchData.next(response.data);
      });
  }


}
