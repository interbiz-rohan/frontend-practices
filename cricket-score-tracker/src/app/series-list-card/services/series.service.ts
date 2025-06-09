import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Match, Series } from '../interfaces/series.interface';
import { AppService } from '../../commons/services/app.service';
import { ApiService } from '../../commons/services/api.service';
import { tap, finalize, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { SeriesListApiService } from '../apis/serieslist-api.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private _series = new BehaviorSubject<Series[]>([]);
  private _selectedMatch = new BehaviorSubject<string | null>(null);
  private _currentMatchData = new BehaviorSubject<Match | null>(null);
  private _isSeriesListExpanded = new BehaviorSubject<boolean>(true);
  private _loadingSeries = new BehaviorSubject<Set<string>>(new Set());
  private searchSubject = new Subject<string>();

  isLoading = signal<boolean>(true);

  series$: Observable<Series[]> = this._series.asObservable();
  selectedMatch$: Observable<string | null> = this._selectedMatch.asObservable();
  currentMatchData$: Observable<Match | null> = this._currentMatchData.asObservable();
  isSeriesListExpanded$: Observable<boolean> = this._isSeriesListExpanded.asObservable();
  loadingSeries$: Observable<Set<string>> = this._loadingSeries.asObservable();

  constructor(
    private appService: AppService,
    private apiService: SeriesListApiService
  ) {
    this.setupSearchSubscription();
    this.fetchInitialSeries();
  }

  private setupSearchSubscription() {
    this.searchSubject.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap(searchTerm => {
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
          this._series.next(seriesWithToggle);
        }
      },
      (error) => {
        console.error('Error searching series:', error);
        this.isLoading.set(false);
      }
    );
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
            this._series.next(seriesWithToggle);
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
    const loadingSet = new Set(this._loadingSeries.getValue());
    loadingSet.add(id);
    this._loadingSeries.next(loadingSet);

    this.apiService
      .getMatchesBySeriesId(id)
      .pipe(
        tap((response) =>
          console.log('API Response (Match List of Series):', response)
        ),
        finalize(() => {
          const updatedLoadingSet = new Set(this._loadingSeries.getValue());
          updatedLoadingSet.delete(id);
          this._loadingSeries.next(updatedLoadingSet);
        })
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

  searchSeries(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  toggleSeriesList() {
    this._isSeriesListExpanded.next(!this._isSeriesListExpanded.getValue());
  }

  selectSeries(id: string) {
    const currentSeries = this._series.getValue();
    const updatedSeries = currentSeries.map((s) => {
      if (s.id === id) {
        if (!s.matchList || s.matchList.length === 0) {
          this.fetchMatchBySeriesId(id);
        }
        return { ...s, showMatches: !s.showMatches };
      }
      return s;
    });
    this._series.next(updatedSeries);
  }

  selectMatch(id: string) {
    this._selectedMatch.next(id);
    this.appService.setSelectedMatch(id);
  }

  isSeriesLoading(id: string): boolean {
    return this._loadingSeries.getValue().has(id);
  }

//   // Only this method uses app service for match data
//   fetchMatchData() {
//     this.appService.currentMatchData$.subscribe(match => {
//       this._currentMatchData.next(match);
//     });
//   }
} 