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
    private movieService:MovieService,
    private router: Router,
    private alertCtrl: AlertController) { 

  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.movieService.getInfo(id).subscribe(res=>{
      console.log(res[0]);
      this.information=res[0];
      this.genres = this.information.genre.split("|");
      console.log(this.genres);
    })
  }

  updateSrc(event){
    console.log("error");
    this.information.poster='./assets/default.png'
  }

  deleteObject(){
    this.alertCtrl.create({
      header:'Are you sure?', 
      message:'Do you really want to delete this movie?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler:()=>{
            this.movieService.deleteObject(this.information.id);
            this.router.navigate(["movies"]);
          }
        }
      ]
    }).then(alertEl=>{
      alertEl.present();
    });
  }

  openWebsite(){
    window.open(this.information.link,'_blank'); 
  }
}
