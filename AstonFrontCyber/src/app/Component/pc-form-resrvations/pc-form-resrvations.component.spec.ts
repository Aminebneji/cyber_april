import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcFormResrvationsComponent } from './pc-form-resrvations.component';

describe('PcFormResrvationsComponent', () => {
  let component: PcFormResrvationsComponent;
  let fixture: ComponentFixture<PcFormResrvationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcFormResrvationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcFormResrvationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
