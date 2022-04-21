import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MovieService} from "./services/movie.service";
import {ReviewService} from "./services/review.service";
import {UserService} from "./services/user.service";
import {authInterceptorProviders} from "./interceptors/auth.interceptor";
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {MoviesComponent} from './pages/movies/movies.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {ManagementComponent} from './pages/management/management.component';
import {AddReviewComponent} from './pages/add-review/add-review.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {OverlayModule} from '@angular/cdk/overlay';
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    MoviesComponent,
    ReviewsComponent,
    ManagementComponent,
    AddReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    OverlayModule,
    MatButtonModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, MovieService, ReviewService, authInterceptorProviders, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {
}
