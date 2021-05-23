import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingninSignupComponent } from './singnin-signup.component';

describe('SingninSignupComponent', () => {
  let component: SingninSignupComponent;
  let fixture: ComponentFixture<SingninSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingninSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingninSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
