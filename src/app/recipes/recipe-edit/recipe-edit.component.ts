import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  @ViewChild("f") recipeForm: NgForm;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.editMode = params["id"] != null;
    });
  }

  onAddIngredient() {
    //
  }

  onDeleteIngredient(index: number) {
    //
  }

  onCancel() {}

  onSubmit() {}

  getRecipeIngredientsControls() {
    return [];
  }
}
