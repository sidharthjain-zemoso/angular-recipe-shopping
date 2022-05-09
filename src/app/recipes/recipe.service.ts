import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      "Dosa",
      "Tasty Dosa",
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/07/dosa-recipe-1.jpg"
    ),
  ];

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }
}
