import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { ExtractRecipeService } from 'src/app/services/extract-recipe.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit, OnDestroy {
  _loading = false;
  _url = '';
  _error = '';
  _recipe?: Recipe;
  recipeSub!: Subscription;

  scale_factor?: number;

  constructor(private extractRecipeService: ExtractRecipeService) {}

  onSubmit() {
    if (this._loading) return;

    this._loading = true;
    this.extractRecipeService.extractRecipe(this._url);
  }

  ngOnInit(): void {
    this.recipeSub = this.extractRecipeService.recipeSubject.subscribe(
      (recipe) => {
        this._loading = false;
        recipe
          ? (this._recipe = recipe)
          : (this._error = 'Error retrieving recipe.');
      }
    );
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }
}
