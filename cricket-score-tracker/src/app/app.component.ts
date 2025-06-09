import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScoreCardComponent } from './score-card/score-card.component';
import { SeriesListCardComponent } from './series-list-card/series-list-card.component';
import { CurrentBattingBowlingCardComponent } from './highlights/hightlights.component';
import { LoadingComponent } from './commons/components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  ScoreCardComponent, SeriesListCardComponent, CurrentBattingBowlingCardComponent , LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cricket-score-tracker';
}
