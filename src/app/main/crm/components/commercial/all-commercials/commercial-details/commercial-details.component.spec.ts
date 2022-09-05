import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialDetailsComponent } from './commercial-details.component';

describe('CommercialDetailsComponent', () => {
  let component: CommercialDetailsComponent;
  let fixture: ComponentFixture<CommercialDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
