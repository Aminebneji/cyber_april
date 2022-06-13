import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListComputerComponent } from './admin-list-computer.component';

describe('AdminListComputerComponent', () => {
  let component: AdminListComputerComponent;
  let fixture: ComponentFixture<AdminListComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListComputerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
