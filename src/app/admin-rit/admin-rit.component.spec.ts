import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRitComponent } from './admin-rit.component';

describe('AdminRitComponent', () => {
  let component: AdminRitComponent;
  let fixture: ComponentFixture<AdminRitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
