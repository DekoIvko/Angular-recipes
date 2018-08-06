import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
         'This is simply a test',
          'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('Another Test Recipe',
         'This is simply a secund test',
          'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
      ];

      constructor(private slService: ShoppingService) {

      }
      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(id: number) {
        return this.recipes[id];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
      }
}