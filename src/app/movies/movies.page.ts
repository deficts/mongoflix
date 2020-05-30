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
  searchType = SearchType;
  selectedType;
  searchValues=this.movieService.searchValues;
  constructor(private movieService: MovieService) { }

  ngOnInit() {}

  updateSrc(i){
    console.log("error");
    console.log(i)
    i.poster='./assets/default.png'
  }

  onSearchChanged(){
    this.results = this.movieService.searchData(this.searchTerm,this.searchType[this.selectedType])
  }
}
