import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  error!: string | null;
  private closeSub!: Subscription;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost!: PlaceholderDirective;

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: any) {
    console.log(form);

    if (this.isLoginMode) {
      this.signInUser(form);
    } else {
      this.registerUser(form);
    }
  }

  signInUser(formValue: any) {
    let email = formValue.email;
    let password = formValue.password;
    this.authService.login(email, password).subscribe(
      (responseData) => {
        this.router.navigate(['/recipes']);
      },
      (error) => {
        console.log(error.message);
        this.error = 'Incorrect Credentials';
        this.showErrorAlert(this.error);
      }
    );
  }

  registerUser(formValue: any) {
    let email = formValue.email;
    let password = formValue.password;
    this.authService.signup(email, password).subscribe(
      (responseData) => {
        console.log(responseData);
      },
      (error) => {
        console.log(error.message);
        this.error = 'Incorrect Credentials';
        this.showErrorAlert(this.error);
      }
    );
  }

  handleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    console.log(this.alertHost + 'Checking');

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
