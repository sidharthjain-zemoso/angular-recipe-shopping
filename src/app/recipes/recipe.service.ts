import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipeSelected = new Subject<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      "Dosa",
      "Tasty Dosa",
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/07/dosa-recipe-1.jpg",
      [new Ingredient("Rawa", 1), new Ingredient("Oil", 1)]
    ),
    new Recipe(
      "Idli",
      "Tasty Idli",
      "https://i0.wp.com/cookingfromheart.com/wp-content/uploads/2016/08/Idli-5.jpg",
      [new Ingredient("Rawa", 1), new Ingredient("Oil", 1)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}
