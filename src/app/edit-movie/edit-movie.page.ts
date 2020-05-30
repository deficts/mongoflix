import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.page.html',
  styleUrls: ['./edit-movie.page.scss'],
})
export class EditMoviePage implements OnInit {
  information = null;

  constructor(
    private movieService: MovieService, 
    private activatedRoute: ActivatedRoute, 
    private alertCtrl: AlertController) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.movieService.getInfo(id).subscribe(res=>{
      console.log(res[0]);
      this.information=res[0];
    })
  }

  editData(obj){
    console.log("metodo");
    this.movieService.editData(obj).subscribe(res=>{
      if(res!=null){
        this.alertCtrl.create({
          header:"Operation succesful!",
          message:"The fields have been updated",
          buttons:[
            {
              text:'Close',
              role:'close'
            }
          ]
        }).then(alertEl=>{
          alertEl.present();
        });
      }
    })
    

  }

}
