import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTest2Component } from './component-test2.component';

describe('ComponentTest2Component', () => {
  let component: ComponentTest2Component;
  let fixture: ComponentFixture<ComponentTest2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentTest2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
