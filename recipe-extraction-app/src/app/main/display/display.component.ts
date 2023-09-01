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

  onChange(newValue: string) {
    let scale_factor = Math.abs(parseFloat(newValue));
    if (Number.isNaN(scale_factor)) {
      this._error = 'Please scale by a number value.';
    } else if (scale_factor > 1000) {
      this._error = 'Scale factor too large.';
    } else if (this._recipe?.ingredients) {
      for (let ingredient of this._recipe?.ingredients) {
        if (!ingredient._quantity) continue;
        ingredient.quantity = ingredient._quantity * scale_factor;
        if (!ingredient._quantity2) continue;
        ingredient.quantity2 = ingredient._quantity2 * scale_factor;
      }
    }
    return;
  }

  ngOnInit(): void {
    this.recipeSub = this.extractRecipeService.recipeSubject.subscribe(
      (recipe) => {
        this._loading = false;
        if (recipe) {
          for (let ingredient of recipe.ingredients) {
            ingredient._quantity = ingredient.quantity;
            ingredient._quantity2 = ingredient.quantity2;
          }
          this._recipe = recipe;
        } else {
          this._error = 'Error retrieving recipe.';
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }
}
