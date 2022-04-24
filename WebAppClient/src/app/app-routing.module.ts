import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddReviewComponent} from './pages/add-review/add-review.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {ManagementComponent} from './pages/management/management.component';
import {MoviesComponent} from './pages/movies/movies.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RegisterComponent} from './pages/register/register.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {AuthenticationGuard} from "./guards/authentication.guard";
import {UsersComponent} from "./pages/users/users.component";
import {GenresComponent} from "./pages/genres/genres.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movie/:id/reviews', component: ReviewsComponent},
  {path: 'addReview', component: AddReviewComponent, canActivate: [AuthenticationGuard]},
  {path: 'management', component: ManagementComponent, canActivate: [AuthenticationGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthenticationGuard]},
  {path: 'genres', component: GenresComponent, canActivate: [AuthenticationGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
