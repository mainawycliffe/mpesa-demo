import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { SignupComponent } from './auth/pages/signup/signup.component';
import { HomeComponent } from './home/home.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './auth/pages/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    ...canActivate(() => redirectLoggedInTo(['dashboard'])),
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
      },
      {
        path: 'signin',
        component: SigninComponent,
        title: 'Sign in',
      },
      {
        path: 'signup',
        component: SignupComponent,
        title: 'Sign Up',
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    ...canActivate(() => redirectUnauthorizedTo(['auth/signin'])),
    title: 'Dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
