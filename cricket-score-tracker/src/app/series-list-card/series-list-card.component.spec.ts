import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesListCardComponent } from './series-list-card.component';

describe('SeriesListCardComponent', () => {
  let component: SeriesListCardComponent;
  let fixture: ComponentFixture<SeriesListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
