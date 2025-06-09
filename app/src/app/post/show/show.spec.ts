import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Show } from './show';

describe('Show', () => {
  let component: Show;
  let fixture: ComponentFixture<Show>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Show]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Show);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
