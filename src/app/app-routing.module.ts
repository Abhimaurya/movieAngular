import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent }      from './movie-list/movie-list.component';
import { RegisterComponent }      from './register/register.component';

const routes: Routes = [
  { path: 'movies', component: MovieListComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}