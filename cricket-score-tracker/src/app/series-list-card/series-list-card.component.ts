import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Match, Series } from './interfaces/series.interface';
import { SeriesService } from './services/series.service';

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

  constructor(public seriesService: SeriesService) {}

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.seriesService.searchSeries(searchTerm);
  }

  toggleSeriesList() {
    this.seriesService.toggleSeriesList();
  }

  selectSeries(id: string) {
    this.seriesService.selectSeries(id);
  }

  ngOnInit(): void {
    this.seriesService.series$
      .pipe(takeUntil(this.destroy$))
      .subscribe((seriesData) => {
        if (seriesData) {
          this.series.set(seriesData);
        }
      });

    this.seriesService.selectedMatch$
      .pipe(takeUntil(this.destroy$))
      .subscribe((matchId) => {
        this.selectedMatch.set(matchId);
      });

    this.seriesService.currentMatchData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((matchData) => {
        this.matchData.set(matchData);
      });

    this.seriesService.isSeriesListExpanded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((expanded) => {
        this.isSeriesListExpanded.set(expanded);
      });
    // this.seriesService.fetchMatchData();
  }

  selectMatch(id: string) {
    this.seriesService.selectMatch(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
