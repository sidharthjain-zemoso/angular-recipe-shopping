import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router
  ) {}
  error: string;
  private closeSub: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: FormGroup) {
    if (this.isLoginMode) {
      this.signInUser(form);
    } else {
      this.registerUser(form);
    }
  }

  signInUser(form: FormGroup) {
    let email = form.value.email;
    let password = form.value.password;
    this.authService.login(email, password).subscribe(
      (responseData) => {
        this.router.navigate(["/recipes"]);
      },
      (error) => {
        console.log(error.message);
        this.error = "Incorrect Credentials";
        this.showErrorAlert(this.error);
      }
    );
  }

  registerUser(form: FormGroup) {
    let email = form.value.email;
    let password = form.value.password;
    this.authService.signup(email, password).subscribe(
      (responseData) => {
        console.log(responseData);
      },
      (error) => {
        console.log(error.message);
        this.error = "Incorrect Credentials";
        this.showErrorAlert(this.error);
      }
    );
  }

  handleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    console.log(this.alertHost + "Checking");
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
