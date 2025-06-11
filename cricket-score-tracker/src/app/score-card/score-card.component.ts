import { Component, computed, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Match, InningStats } from './interfaces/scorecard.interface';
import { ScorecardService } from './services/scorecard.service';
import { AppService } from '../commons/services/app.service';

@Component({
  selector: 'app-score-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-card.component.html',
  styleUrl: './score-card.component.css'
})
export class ScoreCardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  matchData = signal<Match | null>(null);
  selectedTeam = signal<string>('');

  constructor(
    private scorecardService: ScorecardService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.scorecardService.fetchMatchData();
    this.getCurrentInning();
    this.scorecardService.currentMatchData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((observe) => {
        this.matchData.set(observe);
      });

    this.scorecardService.selectedTeam$
      .pipe(takeUntil(this.destroy$))
      .subscribe((team) => {
        this.selectedTeam.set(team);
      });
  }

  selectTeam(team: string): void {
    this.scorecardService.selectTeam(team);
  }

  getCurrentInning(): InningStats | null {
    return this.scorecardService.getCurrentInning();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
