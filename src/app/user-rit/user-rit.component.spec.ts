import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserRitComponent} from './user-rit.component';
import {NgbActiveModal, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppRoutingModule} from "@app/app-routing.module";
import {FormBuilder} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UserRitComponent', () => {
  let component: UserRitComponent;
  let fixture: ComponentFixture<UserRitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRitComponent],
      imports: [
        NgbModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [NgbActiveModal, NgbModal, AppRoutingModule, FormBuilder]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRitComponent);
    component = fixture.componentInstance;
    component.selectedRit = {
      id: 1,
      title: 'title',
      start: new Date(Date.now()),
      end: new Date(Date.now())
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
