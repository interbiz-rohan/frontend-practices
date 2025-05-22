import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardCardComponent } from './scorecard-card.component';

describe('ScorecardCardComponent', () => {
  let component: ScorecardCardComponent;
  let fixture: ComponentFixture<ScorecardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScorecardCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScorecardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
