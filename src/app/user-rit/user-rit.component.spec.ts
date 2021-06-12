import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRitComponent } from './user-rit.component';

describe('UserRitComponent', () => {
  let component: UserRitComponent;
  let fixture: ComponentFixture<UserRitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
