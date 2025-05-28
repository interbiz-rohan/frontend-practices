import { Component, computed, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../services/app.service';
import { Match, InningStats } from '../interfaces/cricket.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-scorecard-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scorecard-card.component.html',
  styleUrl: './scorecard-card.component.css'
})
export class ScorecardCardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  matchData = signal<Match | null>(null);
  selectedTeam = signal<string>('');

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.currentMatchData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((observe) => {
        this.matchData.set(observe);
        if (observe && observe.teams && observe.teams.length > 0) {
          this.selectedTeam.set(observe.teams[0]);
        }
      });
  }

  selectTeam(team: string): void {
    this.selectedTeam.set(team);
  }

  getCurrentInning(): InningStats | null {
    const match = this.matchData();
    if (!match?.scorecard) return null;
    return match.scorecard.find((inning) => 
      inning.inning.includes(this.selectedTeam())
    ) || null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
