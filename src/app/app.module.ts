import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/pages/signup/signup.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { AuthModule } from '@angular/fire/auth';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './auth/pages/signin/signin.component';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TopUpComponent } from './dashboard/top-up/top-up.component';
import { ViewBalanceComponent } from './dashboard/view-balance/view-balance.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    AuthLayoutComponent,
    HomeComponent,
    DashboardComponent,
    SigninComponent,
    TopUpComponent,
    ViewBalanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthGuardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
