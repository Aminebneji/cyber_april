import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcFormEditComponent } from './pc-form-edit.component';

describe('PcFormEditComponent', () => {
  let component: PcFormEditComponent;
  let fixture: ComponentFixture<PcFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcFormEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
