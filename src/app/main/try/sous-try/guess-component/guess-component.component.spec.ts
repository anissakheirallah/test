import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessComponentComponent } from './guess-component.component';

describe('GuessComponentComponent', () => {
  let component: GuessComponentComponent;
  let fixture: ComponentFixture<GuessComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
