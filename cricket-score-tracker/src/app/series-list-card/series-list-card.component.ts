import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-series-list-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series-list-card.component.html',
  styleUrl: './series-list-card.component.css'
})
export class SeriesListCardComponent {

  series = [
    {
      id: 1,
      name: 'IPL Series',
      matches: [
        { id: 101, team1: 'Chennai Super Kings', team2: 'Delhi Capitals', result: 'Chennai won by 6 runs' },
        { id: 102, team1: 'Chennai Super Kings', team2: 'Delhi Capitals', result: 'Chennai won by 6 runs' },
        { id: 103, team1: 'Chennai Super Kings', team2: 'Delhi Capitals', result: 'Chennai won by 6 runs' },
      ],
      showMatches: false
    },
    {
      id: 2,
      name: 'Srilanka Test Series',
      matches: [
        { id: 201, team1: 'Sri Lanka', team2: 'India', result: 'Match Drawn' },
        { id: 202, team1: 'Sri Lanka', team2: 'India', result: 'India won by an inning' },
      ],
      showMatches: false
    }
  ];

  selectedSeries = this.series[0];
  isListOpen: boolean = false;

  selectSeries(selectedSery: any): void {
    this.series.forEach(s => {
      if (s.id === selectedSery.id) {
        s.showMatches = !s.showMatches;
      } else {
        s.showMatches = false;
      }
    });
  }

  toggleList(): void {
    this.isListOpen = !this.isListOpen;
  }

}
