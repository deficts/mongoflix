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
    private movieService:MovieService,
    private alertCtrl:AlertController) { }

  validateObj(obj){
    for (var key in obj){
      if(key=='link' || key=='poster'){
        continue;
      }
      if(obj[key]==="" || obj[key]===null){
        return false;
      }
    }
    return true;
  }

  validUrls(obj){
    try{
      if(obj.link != ''){
        var url = new URL(obj.link);
      }
      if(obj.poster != ''){
        var url2 = new URL(obj.poster);
      }
    }catch(_){
      return false;
    }
    return true;
  }

  createObject(){
    if(this.validateObj(this.obj) && this.validUrls(this.obj)){
      this.movieService.createObject(this.obj).subscribe(res=>{
        if(res!=null){
          this.alertCtrl.create({
            header:"Operation succesful!",
            message:"The movie was created",
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
    }else if(!this.validateObj(this.obj)){
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
    }else if(!this.validUrls(this.obj)){
      this.alertCtrl.create({
        header:"You entered invalid URLS!",
        message:"Enter valid URLS or leave them empty",
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
