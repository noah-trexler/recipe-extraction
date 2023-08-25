import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { ExtractRecipeService } from 'src/app/services/extract-recipe.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  _url = '';
  _recipe?: Recipe;
  recipeSub!: Subscription;

  constructor(private extractRecipeService: ExtractRecipeService) {}

  onSubmit() {
    this.extractRecipeService.extractRecipe(this._url);
  }

  ngOnInit(): void {
    this.recipeSub = this.extractRecipeService.recipeSubject.subscribe(
      (recipe) => {
        console.log(recipe);
        this._recipe = recipe;
      }
    );
  }
}
