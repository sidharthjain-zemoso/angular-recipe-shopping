import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "./user.model";
import { tap } from "rxjs";
import { Router } from "@angular/router";

export interface AuthResponseData {
  idToken: string; // A Firebase Auth ID token for the newly created user.
  email: string; // The email for the newly created user.
  refreshToken: string; //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string; //	The number of seconds in which the ID token expires.
  localId: string; // The uid of the newly created user.
  registered: boolean; // Whether the email is for an existing account.
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  firebaseApiKey = "AIzaSyBuS9sQFbCWnFQAVbMIZjskrVy1YmZ3ENo";
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseApiKey}`,
        {
          header: {
            "Content-Type": "application/json",
          },
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => this.handleError(errorRes)),
        tap((responseData: AuthResponseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseApiKey}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(catchError((errorRes) => this.handleError(errorRes)))
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exits.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct.";
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
