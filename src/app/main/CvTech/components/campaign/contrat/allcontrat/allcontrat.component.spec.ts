import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcontratComponent } from './allcontrat.component';

describe('AllcontratComponent', () => {
  let component: AllcontratComponent;
  let fixture: ComponentFixture<AllcontratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcontratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
