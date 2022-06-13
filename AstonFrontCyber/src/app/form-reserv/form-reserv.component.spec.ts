import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormReservComponent } from './form-reserv.component';

describe('FormReservComponent', () => {
  let component: FormReservComponent;
  let fixture: ComponentFixture<FormReservComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReservComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
