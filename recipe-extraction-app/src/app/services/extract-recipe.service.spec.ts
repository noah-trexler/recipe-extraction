import { TestBed } from '@angular/core/testing';

import { ExtractRecipeService } from './extract-recipe.service';

describe('ExtractRecipeService', () => {
  let service: ExtractRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
