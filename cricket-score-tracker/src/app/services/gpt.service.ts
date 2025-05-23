// write here

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

interface Match {
  id: number;
  team1: string;
  team2: string;
  result: string;
}

interface Series {
  id: number;
  name: string;
  matches: Match[];
  showMatches?: boolean;
}

interface ScorecardData {
}

interface CurrentMatchData {
}

interface AppState {
  series: Series[];
  selectedSeries: Series | null;
  scorecardData: ScorecardData | null;
  currentMatchData: CurrentMatchData | null;
  activeScorecardTeam: string; 
}

@Injectable({providedIn:"root"})
export class AppService {



  private _series = new BehaviorSubject<Series[]>([]);
//   private _selectedSeries = new BehaviorSubject<Series | null>(this.initialSeries[0]);
  private _scorecardData = new BehaviorSubject<ScorecardData | null>(null);
  private _currentMatchData = new BehaviorSubject<CurrentMatchData | null>(null);
  private _activeScorecardTeam = new BehaviorSubject<string>('Australia');

  series$: Observable<Series[]> = this._series.asObservable();
//   selectedSeries$: Observable<Series | null> = this._selectedSeries.asObservable();
  scorecardData$: Observable<ScorecardData | null> = this._scorecardData.asObservable();
  currentMatchData$: Observable<CurrentMatchData | null> = this._currentMatchData.asObservable();
  activeScorecardTeam$: Observable<string> = this._activeScorecardTeam.asObservable();

  constructor(private apiService: ApiService) { }

  setSeries(series: Series[]): void {
    this._series.next(series);
  }

  selectSeries(series: Series): void {
    const updatedSeries = this._series.value.map(s => {
      if (s.id === series.id) {
        return { ...s, showMatches: !s.showMatches };
      } else {
        return { ...s, showMatches: false };
      }
    });
    this._series.next(updatedSeries);

    this._selectedSeries.next(series);

    this.setScorecardData(null);
    this.setCurrentMatchData(null);
  }

  setScorecardData(data: ScorecardData | null): void {
    this._scorecardData.next(data);
  }

  setCurrentMatchData(data: CurrentMatchData | null): void {
    this._currentMatchData.next(data);
  }

  setActiveScorecardTeam(team: string): void {
    this._activeScorecardTeam.next(team);
  }

  fetchInitialSeries(): void {
    this.apiService.getSeriesList().pipe(
      tap(response => console.log('API Response (Series List):', response))
    ).subscribe(
      (response) => {
        if (response && response.data) {
          const seriesWithToggle = response.data.map((s: Series) => ({ ...s, showMatches: false }));
          this.setSeries(seriesWithToggle);
        }
      },
      (error) => {
        console.error('Error fetching series list:', error);
      }
    );
  }

  fetchMatchDetails(seriesId: number): void {
    this.apiService.getMatchesBySeriesId(seriesId).pipe(
       tap(response => console.log(`API Response (Matches for Series ${seriesId}):`, response))
    ).subscribe(
      (response) => {
        if (response && response.matches) {
          const currentSeries = this._series.value;
          const updatedSeries = currentSeries.map(s => {
            if (s.id === seriesId) {
              return { ...s, matches: response.matches };
            } else {
              return s;
            }
          });
          this.setSeries(updatedSeries);
        }
      },
      (error) => {
        console.error(`Error fetching matches for series ${seriesId}:`, error);
      }
    );
  }

}