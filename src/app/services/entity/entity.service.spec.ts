import { TestBed } from '@angular/core/testing';

import { EntityService } from './entity.service';
import {Book} from '../../models/book';

describe('EntityService', () => {
  let service: EntityService<Book>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
