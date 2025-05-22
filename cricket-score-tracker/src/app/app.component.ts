import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScorecardCardComponent } from './scorecard-card/scorecard-card.component';
import { SeriesListCardComponent } from './series-list-card/series-list-card.component';
import { CurrentBattingBowlingCardComponent } from './current-batting-bowling-card/current-batting-bowling-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  ScorecardCardComponent, SeriesListCardComponent, CurrentBattingBowlingCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cricket-score-tracker';
}
