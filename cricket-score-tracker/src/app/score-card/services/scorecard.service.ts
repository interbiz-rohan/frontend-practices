import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Match, InningStats } from '../interfaces/scorecard.interface';
import { AppService } from '../../commons/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class ScorecardService {
  private _currentMatchData = new BehaviorSubject<Match | null>(null);
  private _selectedTeam = new BehaviorSubject<string>('');
  
  currentMatchData$: Observable<Match | null> = this._currentMatchData.asObservable();
  selectedTeam$: Observable<string> = this._selectedTeam.asObservable();

  constructor(private appService: AppService) {}

  fetchMatchData() {
    this.appService.currentMatchData$.subscribe(match => {
      this._currentMatchData.next(match);
      if (match && match.teams && match.teams.length > 0) {
        this._selectedTeam.next(match.teams[0]);
      }
    });
  }

  selectTeam(team: string) {
    this._selectedTeam.next(team);
  }

  getCurrentInning(): InningStats | null {
    const match = this._currentMatchData.getValue();
    if (!match?.scorecard) return null;
    return match.scorecard.find((inning) => 
      inning.inning.includes(this._selectedTeam.getValue())
    ) || null;
  }
} 