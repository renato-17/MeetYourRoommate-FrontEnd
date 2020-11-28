import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLessorComponent } from './home-lessor.component';

describe('HomeLessorComponent', () => {
  let component: HomeLessorComponent;
  let fixture: ComponentFixture<HomeLessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
