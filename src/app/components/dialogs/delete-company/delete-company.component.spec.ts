import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCompanyComponent } from './delete-company.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('DeleteCompanyComponent', () => {
  let component: DeleteCompanyComponent;
  let fixture: ComponentFixture<DeleteCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCompanyComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
