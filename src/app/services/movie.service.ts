import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export enum SearchType{
  all='All',
  action='Action',
  adventure='Adventure',
  animation='Animation',
  comedy='Comedy',
  crime='Crime',
  documentary='Documentary',
  drama='Drama',
  family='Family',
  fantasy='Fantasy',
  horror='Horror',
  scifi='Sci-Fi',
  short='Short',
  romance='Romance',
  sport='Sport',
  thriller='Thriller',
  war='War'
}

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  url='https://deficts-movies-api.herokuapp.com/api/movies/';
  constructor(private http: HttpClient) { }
  searchValues=Object.keys(SearchType);

  searchData(title:string, type:SearchType): Observable<any>{
    return this.http.get(`${this.url}?title=${(title)}&genre=${type}`).pipe(
      map(results=>{
        return results;
      })
    );
  }

  getInfo(id){
    return this.http.get(`${this.url}?id=${id}`);
  }
}
