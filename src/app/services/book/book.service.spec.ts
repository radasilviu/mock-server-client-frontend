import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {Env} from '../../configs/env';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
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

    const req = httpMock.expectOne(Env.resourceServerRootURL + '/api/book/list');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(expectedBody);
  });

  it('list() should send a POST request with properly formatted data _ desc', () => {
    const expectedBody =     {
      pageSize : 20,
      offset : 0,
      searchTerm : '',
      sortDirection : 'desc',
      sortColumn : 'title',
      columnsToSearchIn: [
        'title'
      ]
    };

    service.list(20, 0, '', ['title'], 'title', 'desc').subscribe();

    const req = httpMock.expectOne(Env.resourceServerRootURL + '/api/book/list');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(expectedBody);
  });

  it('list() should send a POST request with properly formatted data _ unsorted', () => {
    const expectedBody =     {
      pageSize : 20,
      offset : 0,
      searchTerm : '',
      sortDirection : '',
      sortColumn : 'title',
      columnsToSearchIn: [
        'title'
      ]
    };

    service.list(20, 0, '', ['title'], 'title', '').subscribe();

    const req = httpMock.expectOne(Env.resourceServerRootURL + '/api/book/list');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(expectedBody);
  });

  it('list() should send a POST request with properly formatted data _ non-0 page index', () => {
    const expectedBody =     {
      pageSize : 20,
      offset : 20,
      searchTerm : '',
      sortDirection : '',
      sortColumn : 'title',
      columnsToSearchIn: [
        'title'
      ]
    };

    service.list(20, 1, '', ['title'], 'title', '').subscribe();

    const req = httpMock.expectOne(Env.resourceServerRootURL + '/api/book/list');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(expectedBody);
  });

  it('list() should send a POST request with properly formatted data _ has search term', () => {
    const expectedBody =     {
      pageSize : 20,
      offset : 0,
      searchTerm : 'searchTerm',
      sortDirection : '',
      sortColumn : 'title',
      columnsToSearchIn: [
        'title'
      ]
    };

    service.list(20, 0, 'searchTerm', ['title'], 'title', '').subscribe();

    const req = httpMock.expectOne(Env.resourceServerRootURL + '/api/book/list');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(expectedBody);
  });
});
