import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {OverlayModule} from '@angular/cdk/overlay';
import {Env} from '../../configs/env';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule, HttpClientTestingModule, MatSnackBarModule]});
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('list() should send a POST request with properly formatted data', () => {
    const expectedBody =     {
      pageSize : 20,
      offset : 0,
      searchTerm : '',
      sortDirection : 'asc',
      sortColumn : 'title',
      columnsToSearchIn: [
        'title'
      ]
    };

    service.list(20, 0, '', ['title'], 'title', 'asc').subscribe();

    const req = httpMock.expectOne(Env.resourceServerRootURL + '/api/company/list');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(expectedBody);

    // Expect server to return the employee after POST
    // const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: expectedBody });
    // req.event(expectedResponse);
  });
});
