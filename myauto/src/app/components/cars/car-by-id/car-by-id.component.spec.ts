import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarByIdComponent } from './car-by-id.component';

describe('CarByIdComponent', () => {
  let component: CarByIdComponent;
  let fixture: ComponentFixture<CarByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
