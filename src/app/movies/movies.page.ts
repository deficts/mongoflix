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
  selectedType = 'All';
  searchValues=this.movieService.searchValues;
  constructor(private movieService: MovieService) { }

  ngOnInit() {}

  updateSrc(i){
    console.log("error");
    console.log(i)
    i.poster='./assets/default.png'
  }

  ionViewWillEnter(){
    console.log("borrado")
    if(this.results){
      console.log("refresh")
      this.results = this.movieService.searchData(this.searchTerm,this.searchType[this.selectedType])
    }
  }

  onSearchChanged(){
    this.results = this.movieService.searchData(this.searchTerm,this.searchType[this.selectedType])
  }
}
