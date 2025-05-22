import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scorecard-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scorecard-card.component.html',
  styleUrl: './scorecard-card.component.css'
})
export class ScorecardCardComponent {

  activeTeam: string = 'Australia';

  selectTeam(team: string): void {
    this.activeTeam = team;
  }

}
