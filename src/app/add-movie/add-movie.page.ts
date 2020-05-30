import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {
  obj={
    title : '',
    genre : '',
    score :0,
    year :0,
    poster : '',
    link :'',
  }
  
  constructor(
    private movieServie:MovieService,
    private alertCtrl:AlertController) { }

  validateObj(obj){
    for (var key in obj){
      if(obj[key]==="" || obj[key]===null){
        return false;
      }
    }
    return true;
  }

  createObject(){
    if(this.validateObj(this.obj)){
      this.movieServie.createObject(this.obj).subscribe(res=>{
        if(res!=null){
          console.log(res);
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
    }else{
      this.alertCtrl.create({
        header:"You left fields empty!",
        message:"Fill all the fields",
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
    
  }
  
  ngOnInit() {
  }

}
