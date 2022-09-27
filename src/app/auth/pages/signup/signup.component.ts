import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSessionService } from '../../auth-session.service';

@Component({
  selector: 'app-signup',
  template: `
    <form #signupForm="ngForm" (submit)="onSignupFormSubmit(signupForm.value)">
      <div class="flex flex-col space-y-4 w-full">
        <h1 class="w-full text-3xl font-bold text-center">Sign Up</h1>
        <div class="flex flex-col w-full space-y-2">
          <label class="text-2xl font-bold tracking-wide" for="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            email
            class="border border-gray-600 px-4 py-3 rounded-md text-xl placeholder:text-2xl placeholder:font-semibold"
            placeholder="Email"
            required
            ngModel
            #email="ngModel"
          />
          <ng-container *ngIf="email.hasError('required') && email.touched">
            <p class="text-red-500 text-lg">Email is required</p>
          </ng-container>
          <ng-container *ngIf="email.hasError('email') && email.touched">
            <p class="text-red-500 text-lg">Email must be valid</p>
          </ng-container>
        </div>
        <div class="flex flex-col w-full space-y-2">
          <label class="text-2xl font-bold tracking-wide" for="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            class="border border-gray-500 px-4 py-3 rounded-md text-xl placeholder:text-2xl placeholder:font-semibold"
            placeholder="Password"
            required
            ngModel
            #password="ngModel"
          />
          <ng-container
            *ngIf="password.hasError('required') && password.touched"
          >
            <p class="text-red-500 text-lg">Password is required</p>
          </ng-container>
        </div>
        <div class="flex flex-col w-full space-y-2">
          <button
            class="border border-gray-500 text-xl font-bold py-4 px-6 rounded-lg text-white bg-blue-500 shadow-md hover:bg-gray-700"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div class="flex flex-col w-full">
          <a routerLink="/auth/signin">Already have an account? Sign in</a>
        </div>
      </div>
    </form>
  `,
  styles: [],
})
export class SignupComponent {
  constructor(
    private authService: AuthSessionService,
    private router: Router
  ) {}

  async onSignupFormSubmit({ email, password }: SignupFormModel) {
    await this.authService.signup(email, password);
    await this.router.navigateByUrl('/dashboard');
  }
}

type SignupFormModel = {
  email: string;
  password: string;
};
