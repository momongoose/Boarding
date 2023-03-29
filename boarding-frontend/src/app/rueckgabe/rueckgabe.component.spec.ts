import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RueckgabeComponent } from './rueckgabe.component';

describe('RueckgabeComponent', () => {
  let component: RueckgabeComponent;
  let fixture: ComponentFixture<RueckgabeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RueckgabeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RueckgabeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
