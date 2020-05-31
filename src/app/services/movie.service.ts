import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const SearchType = {
  'All':'',
  'Action':'Action',
  'Adventure':'Adventure',
  'Animation':'Animation',
  'Comedy':'Comedy',
  'Crime':'Crime',
  'Documentary':'Documentary',
  'Drama':'Drama',
  'Family':'Family',
  'Fantasy':'Fantasy',
  'Horror':'Horror',
  'Scifi':'Sci-Fi',
  'Short':'Short',
  'Romance':'Romance',
  'Sport':'Sport',
  'Thriller':'Thriller',
  'War':'War'
}

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  url='https://deficts-movies-api.herokuapp.com/api/movies/';
  constructor(private http: HttpClient) { }
  searchValues=Object.keys(SearchType);

  searchData(title:string, type,gte,lte): Observable<any>{
    if(title){
      return this.http.get(`${this.url}?title=${(title)}&genre=${type}&gte=${gte}&lte=${lte}`).pipe(
        map(results=>{
          return results;
        })
      );
    }
  }

  getInfo(id){
    return this.http.get(`${this.url}?id=${id}`);
  }

  editData(obj){
    return this.http.put(`${this.url}?title=${obj.title}&score=${obj.score}&year=${obj.year}
    &genre=${obj.genre}&id=${obj.id}&link=${obj.link}&poster=${obj.poster}`,null).pipe(
      map(results=>{
        return results;
      })
    )
  }

  createObject(obj){
    return this.http.post(`${this.url}?title=${obj.title}&score=${obj.score}&year=${obj.year}
    &genre=${obj.genre}&id=${obj.id}&link=${obj.link}&poster=${obj.poster}`,null).pipe(
      map(results=>{
        return results;
      })
    )
  }

  deleteObject(id){
    console.log("deleting");
    console.log(`${this.url}?id=${id}`);
    this.http.delete(`${this.url}?id=${id}`).subscribe(res=>{
      return res;
    })

  }

}
