import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminRitComponent} from './admin-rit.component';
import {NgbActiveModal, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppRoutingModule} from "@app/app-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder} from "@angular/forms";

describe('AdminRitComponent', () => {
  let component: AdminRitComponent;
  let fixture: ComponentFixture<AdminRitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRitComponent],
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
    fixture = TestBed.createComponent(AdminRitComponent);
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
