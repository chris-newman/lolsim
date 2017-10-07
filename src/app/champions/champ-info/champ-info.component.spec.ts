import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampInfoComponent } from './champ-info.component';

describe('ChampInfoComponent', () => {
  let component: ChampInfoComponent;
  let fixture: ComponentFixture<ChampInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
