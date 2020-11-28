import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLessorComponent } from './register-lessor.component';

describe('RegisterLessorComponent', () => {
  let component: RegisterLessorComponent;
  let fixture: ComponentFixture<RegisterLessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
