import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../services/app.service';
import { Observable, Observer, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-current-batting-bowling-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-batting-bowling-card.component.html',
  styleUrl: './current-batting-bowling-card.component.css'
})
export class CurrentBattingBowlingCardComponent implements OnInit,OnDestroy{
  matchData = signal<any>(null);
  private destroy$ = new Subject<void>()

  constructor(private appService:AppService){}

  ngOnInit(): void {
    this.appService.currentMatchData$
    .pipe(takeUntil(this.destroy$))
    .subscribe((observe) => {
      this.matchData.set(observe);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }
}
