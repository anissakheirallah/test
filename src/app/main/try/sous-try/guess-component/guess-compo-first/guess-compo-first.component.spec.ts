import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessCompoFirstComponent } from './guess-compo-first.component';

describe('GuessCompoFirstComponent', () => {
  let component: GuessCompoFirstComponent;
  let fixture: ComponentFixture<GuessCompoFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessCompoFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessCompoFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
