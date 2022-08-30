import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCommercialsComponent } from './all-commercials.component';

describe('AllCommercialsComponent', () => {
  let component: AllCommercialsComponent;
  let fixture: ComponentFixture<AllCommercialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCommercialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCommercialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
