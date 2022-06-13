import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModaleComponent } from './login-modale.component';

describe('LoginModaleComponent', () => {
  let component: LoginModaleComponent;
  let fixture: ComponentFixture<LoginModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginModaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
