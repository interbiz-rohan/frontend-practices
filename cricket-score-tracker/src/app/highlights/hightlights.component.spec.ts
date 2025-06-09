import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBattingBowlingCardComponent } from './hightlights.component';

describe('CurrentBattingBowlingCardComponent', () => {
  let component: CurrentBattingBowlingCardComponent;
  let fixture: ComponentFixture<CurrentBattingBowlingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentBattingBowlingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentBattingBowlingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
