import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then( m => m.MoviesPageModule)
  },
  {
    path: 'movies/:id',
    loadChildren: () => import('./movie-detail/movie-detail.module').then( m => m.MovieDetailPageModule)
  },
  {
    path: 'add-movie',
    loadChildren: () => import('./add-movie/add-movie.module').then( m => m.AddMoviePageModule)
  },
  {
    path: 'edit-movie/:id',
    loadChildren: () => import('./edit-movie/edit-movie.module').then( m => m.EditMoviePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
