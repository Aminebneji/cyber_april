import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcFormGetComponent } from './pc-form-get.component';

describe('PcFormGetComponent', () => {
  let component: PcFormGetComponent;
  let fixture: ComponentFixture<PcFormGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcFormGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcFormGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
