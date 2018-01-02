import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuneTreeComponent } from './rune-tree.component';

describe('RuneTreeComponent', () => {
  let component: RuneTreeComponent;
  let fixture: ComponentFixture<RuneTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuneTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuneTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
