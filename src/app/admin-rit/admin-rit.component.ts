import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Rit} from "@app/_models/rit";
import {RitService} from "@app/_services/rit.service";

@Component({
  selector: 'app-admin-rit',
  templateUrl: './admin-rit.component.html',
  styleUrls: ['./admin-rit.component.scss']
})
export class AdminRitComponent implements OnInit {

  title;
  buttonTitle;
  selectedRit: Rit;
  editForm: FormGroup;
  isLoading = false;
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute, private ritService: RitService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setForm()
  }

  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    console.log(this.selectedRit)
    if (this.selectedRit.id!= null) {
      this.ritService.updateRit(this.editForm.value).subscribe(x => {
          this.isLoading = false;
          this.modal.close('Yes')
        },
        error => {
          this.isLoading = false;
        });
    } else {
      this.ritService.addRit(this.editForm.value).subscribe(x => {
          this.isLoading = false;
          this.modal.close('Yes')
        },
        error => {
          this.isLoading = false;
        });
    }
  }

  get editFormData() { return this.editForm.controls; }

  private setForm() {
    if (this.selectedRit.id!= null) {
      this.title = "Rit updaten";
      this.buttonTitle = "Update";
      this.editForm = this.formBuilder.group({
        id: [this.selectedRit.id],
        title: [this.selectedRit.title, Validators.required],
        start: new FormControl(this.selectedRit.start.toISOString().substring(0, 16), Validators.required),
        end: new FormControl(this.selectedRit.end.toISOString().substring(0, 16), Validators.required),
      });
    } else {
      this.title = "Rit toevoegen";
      this.buttonTitle = "Toevoegen";
      this.editForm = this.formBuilder.group({
        title: [this.selectedRit.title, Validators.required],
        start: new FormControl(this.selectedRit.start.toISOString().substring(0, 16), Validators.required),
        end: new FormControl(this.selectedRit.end.toISOString().substring(0, 16), Validators.required),
      });
    }
  }
}
