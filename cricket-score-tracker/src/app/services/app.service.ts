// write here

import { effect, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { tap, finalize } from 'rxjs/operators';

export interface Match {
  id: string;
  teams: string[];
  result: string;
  status: string;
}

export interface Series {
  id: string;
  name: string;
  showMatches: boolean;
  matchList: Match[];
}

interface ScorecardData {}

interface CurrentMatchData {}

interface AppState {
  series: Array<any>;
  selectedSeries: Series | null;
  scorecardData: ScorecardData | null;
  currentMatchData: CurrentMatchData | null;
  activeScorecardTeam: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _series = new BehaviorSubject<any[]>([]);
  private _selectedSeries = new BehaviorSubject<string | null>(null);
  private _selectedMatch = new BehaviorSubject<string | null>(null);
  private _scorecardData = new BehaviorSubject<ScorecardData | null>(null);
  private _currentMatchData = new BehaviorSubject<any>(null);
  private _activeScorecardTeam = new BehaviorSubject<string>('Australia');

  // Loading state signal
  isLoading = signal<boolean>(true);

  series$: Observable<any[]> = this._series.asObservable();
  selectedSeries$: Observable<string | null> =
    this._selectedSeries.asObservable();
  selectedMatch$: Observable<string | null> =
    this._selectedMatch.asObservable(); 
  scorecardData$: Observable<ScorecardData | null> =
    this._scorecardData.asObservable();
  currentMatchData$: Observable<any> = this._currentMatchData.asObservable();
  activeScorecardTeam$: Observable<string> =
    this._activeScorecardTeam.asObservable();

  

  constructor(private apiService: ApiService) {
    console.log('api hits here');
    this.fetchInitialSeries();
    // this.loadInitialData();
    effect(()=>{
       console.log("Loader -",this.isLoading())
    });
  }

  setSeries(series: any[]): void {
    this._series.next(series);
  }

  setSelectedSeries(id: string) {
    this._selectedSeries.next(id);
    this.fetchMatchBySeriesId(id);
  }

  setSelectedMatch(id: string){
    this._selectedMatch.next(id)
    this.fetchMatchData(id)
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
            const seriesWithToggle = response.data.map((s: any) => ({
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

  fetchMatchData(id: any) {
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

  // Intialze from json

  // private loadInitialData() {
  //   import('./series.json')
  //     .then((module) => {
  //       console.log('Loaded series data:', module);
  //       const data = module.default;
  //       if (Array.isArray(data)) {
  //         const seriesData = data.map((series) => ({
  //           ...series,
  //           showMatches: false,
  //           matchList: [],
  //         }));
  //         this._series.next(seriesData);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error loading series data:', error);
  //       this.fetchInitialSeries();
  //     });

  //   import('./matchList.json').then((module) => {
  //     const data = module.default;
  //     let updatedSeries:Array<any>=[];
  //     this._series.subscribe((observer) => {
  //        updatedSeries = observer.map((value) => {
  //         if (value.id === '3b37257a-1c4a-46d3-8eef-b0d9cd6f8bc2')
  //           return { ...value, matchList: data };
  //         else return value;
  //       });
  //     });

  //     this._series.next(updatedSeries);

  //   });
  // }
}
