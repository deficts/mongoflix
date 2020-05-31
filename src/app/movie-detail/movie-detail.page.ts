import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  information=null;
  genres=null;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private movieService:MovieService
    ) { 

  }

  getInfo(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.movieService.getInfo(id).subscribe(res=>{
      console.log(res[0]);
      this.information=res[0];
      this.genres = this.information.genre.split("|");
      console.log(this.genres);
    })
  }
  
  ngOnInit() {
    this.getInfo();
  }

  ionViewWillEnter(){
    if(this.information){
      console.log("refresh");
      this.getInfo();
    }
  }

  updateSrc(event){
    console.log("error");
    this.information.poster='./assets/default.png'
  }

  openWebsite(){
    window.open(this.information.link,'_system'); 
  }
}
