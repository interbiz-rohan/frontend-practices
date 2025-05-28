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

  isLoading = signal<boolean>(true);

  series$: Observable<Series[]> = this._series.asObservable();
  selectedSeries$: Observable<string | null> = this._selectedSeries.asObservable();
  selectedMatch$: Observable<string | null> = this._selectedMatch.asObservable();
  currentMatchData$: Observable<Match | null> = this._currentMatchData.asObservable();
  activeScorecardTeam$: Observable<string> = this._activeScorecardTeam.asObservable();

  constructor(private apiService: ApiService) {
    console.log('api hits here');
    this.fetchInitialSeries();
    this.setupSearchSubscription();
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

  setSelectedSeries(id: string) {
    this._selectedSeries.next(id);
    this.fetchMatchBySeriesId(id);
  }

  setSelectedMatch(id: string) {
    this._selectedMatch.next(id);
    this.fetchMatchData(id);
  }

  fetchInitialSeries(): void {
    this.isLoading.set(true);
    this.apiService
      .getSeriesList()
      .pipe(
        tap((response) => console.log('API Response (Series List):', response)),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe(
        (response) => {
          if (response && response.data) {
            const seriesWithToggle = response.data.map((s) => ({
              ...s,
              showMatches: false,
              matchList: [],
            }));
            this.setSeries(seriesWithToggle);
          } else {
            alert("Failure - " + response.reason);
          }
        },
        (error) => {
          console.error('Error fetching series list:', error);
        }
      );
  }

  fetchMatchBySeriesId(id: string): void {
    this.isLoading.set(true);
    this.apiService
      .getMatchesBySeriesId(id)
      .pipe(
        tap((response) =>
          console.log('API Response (Match List of Series):', response)
        ),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((response) => {
        if (response && response.data && response.data.matchList) {
          const currentSeries = this._series.getValue();
          const updatedSeries = currentSeries.map((series) =>
            series.id === id
              ? {
                  ...series,
                  matchList: response.data.matchList,
                  showMatches: true,
                }
              : { ...series, showMatches: false }
          );
          this._series.next(updatedSeries);
        } else {
          alert("Failure - " + response.reason);
        }
      });
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

  private setupSearchSubscription() {
    this.searchSubject.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        console.log("-----------")
        return this.apiService.searchSeries(searchTerm).pipe(
          finalize(() => this.isLoading.set(false))
        );
      })
    ).subscribe(
      (response) => {
        if (response && response.data) {
          const seriesWithToggle = response.data.map((s: Series) => ({
            ...s,
            showMatches: false,
            matchList: [],
          }));
          this.setSeries(seriesWithToggle);
        } else {
          // alert("Failure - " + response.reason);
        }
      },
      (error) => {
        console.error('Error searching series:', error);
        this.isLoading.set(false);
      }
    );
  }
}
