import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../services/app.service';
import { Series, Match } from '../interfaces/cricket.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-series-list-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series-list-card.component.html',
  styleUrl: './series-list-card.component.css',
})
export class SeriesListCardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  series = signal<Series[]>([]);
  matchData = signal<Match | null>(null);
  selectedMatch = signal<string | null>(null);
  isSeriesListExpanded = signal<boolean>(true);

  activeSeries = computed(() => {
    return this.series().filter((s) => s.showMatches);
  });

  totalMatches = computed(() => {
    return this.series().reduce((total, series) => {
      const matchCount = series.matchList?.length || 0;
      return total + matchCount;
    }, 0);
  });

  getSelectedMatchInSeries = computed(() => (series: Series): Match | null => {
    if (!series.matchList || !this.selectedMatch()) return null;
    return series.matchList.find(match => match.id === this.selectedMatch()) || null;
  });

  constructor(private appService: AppService) {}

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.appService.searchSeries(searchTerm);
  }

  toggleSeriesList() {
    this.isSeriesListExpanded.update(value => !value);
  }

  selectSeries(id: string) {
    const updatedSeries = this.series().map((s) => {
      if (s.id === id) {
        if (!s.matchList || s.matchList.length === 0) {
          this.appService.setSelectedSeries(id);
        }
        return { ...s, showMatches: !s.showMatches };
      }
      return s;
    });
    this.series.set(updatedSeries);
  }

  ngOnInit(): void {
    this.appService.series$
      .pipe(takeUntil(this.destroy$))
      .subscribe((seriesData) => {
        if (seriesData) {
          this.series.set(seriesData);
        }
      });

    this.appService.selectedMatch$
      .pipe(takeUntil(this.destroy$))
      .subscribe((observer) => {
        this.selectedMatch.set(observer);
      });

    this.appService.currentMatchData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((observe) => {
        this.matchData.set(observe);
      });
  }

  selectMatch(id: string) {
    this.appService.setSelectedMatch(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
