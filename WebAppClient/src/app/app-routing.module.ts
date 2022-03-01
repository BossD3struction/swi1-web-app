import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddReviewComponent} from './pages/add-review/add-review.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {ManagementComponent} from './pages/management/management.component';
import {MoviesComponent} from './pages/movies/movies.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RegisterComponent} from './pages/register/register.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movie/:id/reviews', component: ReviewsComponent},
  {path: 'addReview', component: AddReviewComponent},
  {path: 'management', component: ManagementComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
