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
      if(obj[key]==="" || obj[key]===null){
        return false;
      }
    }
    return true;
  }

  editData(obj){
    console.log("metodo");
    if(this.validateObj(obj)){
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

  deleteObject(){
    console.log("hola");
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
