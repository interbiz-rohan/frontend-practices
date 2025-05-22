// write here

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';

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

  constructor() { }


}