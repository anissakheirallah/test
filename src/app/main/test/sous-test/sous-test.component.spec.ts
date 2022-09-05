import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousTestComponent } from './sous-test.component';

describe('SousTestComponent', () => {
  let component: SousTestComponent;
  let fixture: ComponentFixture<SousTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SousTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
