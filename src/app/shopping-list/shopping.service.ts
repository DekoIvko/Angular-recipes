import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingService {
    ingrediantsAdded = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      getingredients() {
          return this.ingredients.slice();
      }

      getIngrediant(index: number) {
          return this.ingredients[index];
      }

      addIngreditans(ingredient: Ingredient) {
          this.ingredients.push(ingredient);
          this.ingrediantsAdded.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingrediantsAdded.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient) {
          this.ingredients[index] = newIngredient;
          this.ingrediantsAdded.next(this.ingredients.slice());
      }
      deleteIngrediant(index: number) {
          this.ingredients.splice(index, 1);
          this.ingrediantsAdded.next(this.ingredients.slice());
      }
}
