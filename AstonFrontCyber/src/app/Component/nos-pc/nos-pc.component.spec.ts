import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosPcComponent } from './nos-pc.component';

describe('NosPcComponent', () => {
  let component: NosPcComponent;
  let fixture: ComponentFixture<NosPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NosPcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NosPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
