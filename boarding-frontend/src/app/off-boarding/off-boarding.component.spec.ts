import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffBoardingComponent } from './off-boarding.component';

describe('OffBoardingComponent', () => {
  let component: OffBoardingComponent;
  let fixture: ComponentFixture<OffBoardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffBoardingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffBoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
