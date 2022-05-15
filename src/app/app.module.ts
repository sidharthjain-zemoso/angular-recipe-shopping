import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { AppRoutingModule } from "./app-routing.module";
import { AuthComponent } from "./auth/auth.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { AuthModule } from "./auth/auth.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
