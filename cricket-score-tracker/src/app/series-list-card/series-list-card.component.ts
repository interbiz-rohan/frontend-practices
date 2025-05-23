import { Component, signal, computed, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-series-list-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series-list-card.component.html',
  styleUrl: './series-list-card.component.css',
})
export class SeriesListCardComponent {
  series = signal<Array<any>>([]);
  matchData = signal<any>({});
  selectedMatch: string | null = null;

  activeSeries = computed(() => {
    return this.series().filter((s) => s.showMatches);
  });

  totalMatches = computed(() => {
    return this.series().reduce((total, series) => {
      const matchCount = series.matchList?.length || 0;
      return total + matchCount;
    }, 0);
  });

  constructor(private appService: AppService) {
    this.appService.series$.subscribe((seriesData) => {
      if (seriesData) {
        this.series.set(seriesData);
      }
    });

    this.appService.selectedMatch$.subscribe((observer) => {
      this.selectedMatch = observer;
    });

    this.appService.currentMatchData$.subscribe((observe) => {
      console.log(observe);
      this.matchData.set(observe);
    });
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

  selectMatch(id: string) {
    this.appService.setSelectedMatch(id);
  }

  

  
}
