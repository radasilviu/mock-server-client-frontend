import {Component} from '@angular/core';
import {Company} from '../../../models/company';
import {CompanyService} from '../../../services/company/company.service';
import {EditCompanyComponent} from '../../dialogs/edit-company/edit-company.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteCompanyComponent} from '../../dialogs/delete-company/delete-company.component';
import {FilterSettings} from '../../../models/filterSettings';
import {FilterService} from '../../../services/filter/filter.service';
import {PaginationComponent} from '../../pagination/pagination.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent extends PaginationComponent<Company>{

  editComponent = EditCompanyComponent;
  deleteDialogComponent = DeleteCompanyComponent;
  sortColumn = 'id';
  displayedColumns: string[] = ['id', 'name', 'industry', 'actions'];
  searchAbleColumns: string[] = ['id', 'name', 'industry'];

  taskDisplayableColumns: FilterSettings = {
    name: 'Fields to display',
    completed: true,
    color: 'primary',
    subcategories: [
      {name: 'id', completed: true, color: 'primary'},
      {name: 'name', completed: true, color: 'primary'},
      {name: 'industry', completed: true, color: 'primary'}
    ]
  };
  taskSearchableColumns: FilterSettings = {
    name: 'Fields to search in',
    completed: true,
    color: 'primary',
    subcategories: [
      {name: 'id', completed: true, color: 'primary'},
      {name: 'name', completed: true, color: 'primary'},
      {name: 'industry', completed: false, color: 'primary'}
    ]
  };

  constructor(private companyService: CompanyService,
              filterService: FilterService,
              dialog: MatDialog) {
    super(filterService, companyService, dialog);
  }
}
