import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteryInfoComponent } from './mastery-info.component';

describe('MasteryInfoComponent', () => {
  let component: MasteryInfoComponent;
  let fixture: ComponentFixture<MasteryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasteryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
