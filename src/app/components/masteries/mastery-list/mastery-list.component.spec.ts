import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteryListComponent } from './mastery-list.component';

describe('MasteryListComponent', () => {
  let component: MasteryListComponent;
  let fixture: ComponentFixture<MasteryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasteryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
