import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private alertCtrl: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.movieService.getInfo(id).subscribe(res=>{
      console.log(res[0]);
      this.information=res[0];
    })
  }

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

  editData(obj){
    if(this.validateObj(obj) && this.validUrls(obj)){
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
    }else if(!this.validateObj(obj)){
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
    }else if(!this.validUrls(obj)){
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
}
