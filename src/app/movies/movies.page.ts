import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchType, MovieService } from '../services/movie.service';
import { PickerController } from '@ionic/angular';

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
  selectedRating = {lower:0,upper:10};
  searchValues=this.movieService.searchValues;
  constructor(private movieService: MovieService, private pickerCtrl: PickerController ) { }

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
      this.results = this.movieService.searchData(this.searchTerm,this.searchType[this.selectedType],this.selectedRating.lower,this.selectedRating.upper)
    }
  }

  onSearchChanged(){
    console.log(this.selectedRating);
    this.results = this.movieService.searchData(this.searchTerm,this.searchType[this.selectedType],this.selectedRating.lower,this.selectedRating.upper)
  }
}
