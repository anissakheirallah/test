import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommercialComponent } from './add-commercial.component';

describe('AddCommercialComponent', () => {
  let component: AddCommercialComponent;
  let fixture: ComponentFixture<AddCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
