import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteriesComponent } from './masteries.component';

describe('MasteriesComponent', () => {
  let component: MasteriesComponent;
  let fixture: ComponentFixture<MasteriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasteriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
