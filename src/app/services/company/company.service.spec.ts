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
      sortColumn : 'name',
      columnsToSearchIn: [
        'name'
      ]
    };

    service.list(20, 0, '', ['name'], 'name', 'asc').subscribe();

    const req = httpMock.expectOne(Env.resourceServerRootURL + '/api/company/list');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(expectedBody);
  });

  it('list() should send a POST request with properly formatted data _ desc', () => {
    const expectedBody =     {
      pageSize : 20,
      offset : 0,
      searchTerm : '',
      sortDirection : 'desc',
      sortColumn : 'name',
      columnsToSearchIn: [
        'name'
      ]
    };

    service.list(20, 0, '', ['name'], 'name', 'desc').subscribe();

    const req = httpMock.expectOne(Env.resourceServerRootURL + '/api/company/list');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(expectedBody);
  });

  it('list() should send a POST request with properly formatted data _ unsorted', () => {
    const expectedBody =     {
      pageSize : 20,
      offset : 0,
      searchTerm : '',
      sortDirection : '',
      sortColumn : 'name',
      columnsToSearchIn: [
        'name'
      ]
    };

    service.list(20, 0, '', ['name'], 'name', '').subscribe();

    const req = httpMock.expectOne(Env.resourceServerRootURL + '/api/company/list');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(expectedBody);
  });

  it('list() should send a POST request with properly formatted data _ non-0 page index', () => {
    const expectedBody =     {
      pageSize : 20,
      offset : 20,
      searchTerm : '',
      sortDirection : '',
      sortColumn : 'name',
      columnsToSearchIn: [
        'name'
      ]
    };

    service.list(20, 1, '', ['name'], 'name', '').subscribe();

    const req = httpMock.expectOne(Env.resourceServerRootURL + '/api/company/list');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(expectedBody);
  });

  it('list() should send a POST request with properly formatted data _ has search term', () => {
    const expectedBody =     {
      pageSize : 20,
      offset : 0,
      searchTerm : 'searchTerm',
      sortDirection : '',
      sortColumn : 'name',
      columnsToSearchIn: [
        'name'
      ]
    };

    service.list(20, 0, 'searchTerm', ['name'], 'name', '').subscribe();

    const req = httpMock.expectOne(Env.resourceServerRootURL + '/api/company/list');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(expectedBody);
  });
});
