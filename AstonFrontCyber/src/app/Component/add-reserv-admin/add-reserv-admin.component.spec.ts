import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservAdminComponent } from './add-reserv-admin.component';

describe('AddReservAdminComponent', () => {
  let component: AddReservAdminComponent;
  let fixture: ComponentFixture<AddReservAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReservAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReservAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
