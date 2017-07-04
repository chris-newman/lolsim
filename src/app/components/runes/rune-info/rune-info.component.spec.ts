import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuneInfoComponent } from './rune-info.component';

describe('RuneInfoComponent', () => {
  let component: RuneInfoComponent;
  let fixture: ComponentFixture<RuneInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuneInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuneInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
