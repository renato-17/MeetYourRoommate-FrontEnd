import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLessorComponent } from './login-lessor.component';

describe('LoginLessorComponent', () => {
  let component: LoginLessorComponent;
  let fixture: ComponentFixture<LoginLessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginLessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
