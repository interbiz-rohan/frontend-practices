import { Component, computed, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-scorecard-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scorecard-card.component.html',
  styleUrl: './scorecard-card.component.css'
})
export class ScorecardCardComponent {

  matchData = signal<any>({});
  selectedTeam = signal<string>('');


  constructor(private appService: AppService) {
    this.appService.currentMatchData$.subscribe((observe) => {
      console.log(observe);
      this.matchData.set(observe);
      this.selectedTeam.set(this.matchData().teams[0])
    });
  }

  selectTeam(team: string): void {
    this.selectedTeam.set(team);
  }

  getCurrentInning() {
    if (!this.matchData()?.scorecard) return null;
    return this.matchData().scorecard.find((inning: any) => 
      inning.inning.includes(this.selectedTeam())
    );
  }

}
