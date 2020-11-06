import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CompanyService} from '../../../services/company/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  editCompanyForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.editCompanyForm = new FormGroup({
      name: new FormControl(this.data.entity.name, [ Validators.required])
    });
  }

  get name(): AbstractControl { return this.editCompanyForm.get('name'); }

  get email(): AbstractControl { return this.editCompanyForm.get('email'); }

  onSubmit(): void {
    this.companyService
      .update(this.data.entity.id, this.editCompanyForm.value)
      .subscribe();
  }
}
