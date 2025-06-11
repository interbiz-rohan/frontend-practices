import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../commons/services/app.service';
import { Observable, Observer, Subject, takeUntil } from 'rxjs';
import { HighlightsService } from './services/highlights.service';
import { Match } from './interfaces/highlights.interface';

@Component({
  selector: 'app-hightlights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hightlights.component.html',
  styleUrl: './hightlights.component.css'
})
export class CurrentBattingBowlingCardComponent implements OnInit, OnDestroy {
  matchData = signal<Match | null>(null);
  private destroy$ = new Subject<void>();

  constructor(
    private highlightService: HighlightsService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.highlightService.fetchMatchData();
    this.highlightService.currentMatchData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((observe) => {
        this.matchData.set(observe);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }
}
