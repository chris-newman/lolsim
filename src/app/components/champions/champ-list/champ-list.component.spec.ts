import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampListComponent } from './champ-list.component';

describe('ChampListComponent', () => {
  let component: ChampListComponent;
  let fixture: ComponentFixture<ChampListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
