import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class ExtractRecipeService {
  recipeSubject = new Subject<Recipe>();

  constructor(private http: HttpClient) {}

  extractRecipe(_url: string) {
    this.http
      .get<{ message: string; recipe: Recipe }>(
        'http://localhost:3000/api/recipe/',
        {
          params: new HttpParams({ fromObject: { url: _url } }),
        }
      )
      .subscribe((response) => {
        this.recipeSubject.next(response.recipe);
      });
  }
}