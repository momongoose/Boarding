import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebergabeprotokollComponent } from './uebergabeprotokoll.component';

describe('UebergabeprotokollComponent', () => {
  let component: UebergabeprotokollComponent;
  let fixture: ComponentFixture<UebergabeprotokollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UebergabeprotokollComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UebergabeprotokollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
