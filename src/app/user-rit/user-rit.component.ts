import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Rit} from "@app/_models/rit";
import {RitService} from "@app/_services/rit.service";

@Component({
  selector: 'app-user-rit',
  templateUrl: './user-rit.component.html',
})
export class UserRitComponent implements OnInit {

  title;
  buttonTitle;
  selectedRit: Rit;
  editForm: FormGroup;
  error: any = {isError: false, errorMessage: ''};
  minDate: string;
  maxDate: string;

  isLoading = false;

  constructor(public modal: NgbActiveModal, private route: ActivatedRoute, private ritService: RitService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.minDate = this.convertDate(this.selectedRit.start);
    this.maxDate = this.convertDate(this.selectedRit.end);
    this.setForm()
  }

  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    console.log(this.selectedRit)
    this.ritService.updateRit(this.editForm.value).subscribe(x => {
        this.isLoading = false;
        this.modal.close('Yes')
      },
      error => {
        this.isLoading = false;
      });

  }

  get editFormData() {
    return this.editForm.controls;
  }

  validateForm() {
    if (new Date(this.editForm.controls['end'].value) < new Date(this.editForm.controls['start'].value)) {
      this.error = {isError: true, errorMessage: "End Date before start date"};
    } else {
      this.error = {isError: false, errorMessage: ""};
    }
    // Accepted timespan between original timespan
    if (new Date(this.editForm.controls['end'].value) > new Date(this.selectedRit.end)) {
      this.error = {isError: true, errorMessage: "End Date must be set before "+ this.selectedRit.end.toISOString()};
    } else {
      this.error = {isError: false, errorMessage: ""};
    }
    if (new Date(this.editForm.controls['start'].value) < new Date(this.selectedRit.start)) {
      this.error = {isError: true, errorMessage: "End Date must be set before "+ this.selectedRit.end.toISOString()};
    } else {
      this.error = {isError: false, errorMessage: ""};
    }
  }

  private setForm() {
    if (this.selectedRit.id != null)
      this.title = "Rit aannemen";
    this.buttonTitle = "Aannemen";
    this.editForm = this.formBuilder.group({
      id: [this.selectedRit.id],
      title: [this.selectedRit.title, Validators.required],
      start: new FormControl(this.convertDate(this.selectedRit.start), Validators.required),
      end: new FormControl(this.convertDate(this.selectedRit.end), Validators.required),
    });

    this.validateForm();
  }

  convertDate(date:Date)
  {
    return new Date(date.getTime() - (new Date().getTimezoneOffset()*60000)).toISOString().substring(0,16)
  }
}
