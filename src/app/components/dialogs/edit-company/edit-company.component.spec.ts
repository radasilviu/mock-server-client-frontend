import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyComponent } from './edit-company.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('EditCompanyComponent', () => {
  let component: EditCompanyComponent;
  let fixture: ComponentFixture<EditCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [ EditCompanyComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {
            company: {
              id: 1,
              industry: 'Media Production',
              name: 'Trantow Inc'
            }
          }},
        { provide: MatDialogRef, useValue: {} }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
