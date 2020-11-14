import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessorProfileComponent } from './lessor-profile.component';

describe('LessorProfileComponent', () => {
  let component: LessorProfileComponent;
  let fixture: ComponentFixture<LessorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessorProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
