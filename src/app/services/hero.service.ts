import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { Hero } from '../model/dto';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private baseUrl = 'http://localhost:8000/heroes';

  constructor(private http:HttpClient) {

   }

   public getHeroes(){
    return this.http.get<Hero[]>(this.baseUrl)
    .pipe( map(data => data), catchError(this.handleError));
   }

   public getHero(id){
    return this.http.get<Hero>(this.baseUrl+"/"+id)
    .pipe( map(data => data), catchError(this.handleError));
   }

   public save(hero: Hero) {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  public delete(hero: Hero) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.delete<Hero>(this.baseUrl+'/'+hero.id).pipe(catchError(this.handleError));
  }

   // Add new Hero
  private post(hero: Hero) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post<Hero>(this.baseUrl, hero)
      .pipe(catchError(this.handleError));
  }

  // Update existing Hero
  private put(hero: Hero) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put<Hero>(this.baseUrl+'/'+hero.id, hero).pipe(catchError(this.handleError));
  }

   private handleError(res: HttpErrorResponse | any) {
    //console.error(res.error || res.body.error);
    console.error(res);
    return observableThrowError(res.error || 'Server error');
  }
}
