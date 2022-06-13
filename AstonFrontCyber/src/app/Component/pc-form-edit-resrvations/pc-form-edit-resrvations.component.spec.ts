import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcFormEditResrvationsComponent } from './pc-form-edit-resrvations.component';

describe('PcFormEditResrvationsComponent', () => {
  let component: PcFormEditResrvationsComponent;
  let fixture: ComponentFixture<PcFormEditResrvationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcFormEditResrvationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcFormEditResrvationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
