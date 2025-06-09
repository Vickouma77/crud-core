import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Create } from './create';

describe('Create', () => {
  let component: Create;
  let fixture: ComponentFixture<Create>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Create]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Create);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
