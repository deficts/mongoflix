import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchType, MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  results: Observable<any>;
  searchTerm: string = '';
  searchType: SearchType=SearchType.all;
  searchValues=this.movieService.searchValues;
  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  onSearchChanged(){
    console.log(this.searchTerm,this.searchType)
    this.results = this.movieService.searchData(this.searchTerm,this.searchType)
  }
}
