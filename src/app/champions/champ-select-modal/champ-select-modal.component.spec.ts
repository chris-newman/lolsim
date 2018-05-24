import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampSelectModalComponent } from './champ-select-modal.component';

describe('ChampListModalComponent', () => {
  let component: ChampSelectModalComponent;
  let fixture: ComponentFixture<ChampSelectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampSelectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
