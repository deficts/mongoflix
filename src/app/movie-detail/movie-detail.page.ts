import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  information=null;

  constructor(private activatedRoute: ActivatedRoute, private movieService:MovieService) { 

  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.movieService.getInfo(id).subscribe(res=>{
      console.log(res[0]);
      this.information=res[0];
    })
  }

}
