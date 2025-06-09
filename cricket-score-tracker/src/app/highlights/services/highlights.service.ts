import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Match } from '../interfaces/highlights.interface';
import { AppService } from '../../commons/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class HighlightsService {
  private _currentMatchData = new BehaviorSubject<Match | null>(null);
  currentMatchData$: Observable<Match | null> = this._currentMatchData.asObservable();

  constructor(private appService: AppService) {}

  fetchMatchData() {
    this.appService.currentMatchData$.subscribe(match => {
      this._currentMatchData.next(match);
    });
  }
} 