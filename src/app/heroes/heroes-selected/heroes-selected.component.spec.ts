import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesSelectedComponent } from './heroes-selected.component';

describe('HeroesSelectedComponent', () => {
  let component: HeroesSelectedComponent;
  let fixture: ComponentFixture<HeroesSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesSelectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
