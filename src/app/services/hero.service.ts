import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { Hero } from '../model/dto';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * CRUD operations for a Hero
 */
export class HeroService {

  private baseUrl = 'http://localhost:8000/heroes';

  constructor(private http:HttpClient) {

   }

   /**
    * Get a list of heroes
    * @returns array of Hero
    */
   public getHeroes(){
    return this.http.get<Hero[]>(this.baseUrl)
    .pipe( map(data => data), catchError(this.handleError));
   }

   /**
    * Get a single Hero
    * @param id integer
    * @returns a Hero
    */
   public getHero(id){
    return this.http.get<Hero>(this.baseUrl+"/"+id)
    .pipe( map(data => data), catchError(this.handleError));
   }

   /**
    * Save or update a Hero, based on existence or not of id
    * @param hero Hero instance 
    * @returns observable Hero instance saved or updated
    */
   public save(hero: Hero) {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  /**
   * Delete a Hero instance
   * @param hero Hero instance to be deleted
   * @returns Observable
   */
  public delete(hero: Hero) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.delete<Hero>(this.baseUrl+'/'+hero.id).pipe(catchError(this.handleError));
  }

   /**
    * Create a new hero
    * @param hero Hero instance to be created
    * @returns the Hero created
    */
  private post(hero: Hero) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post<Hero>(this.baseUrl, hero)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing hero
   * @param hero Hero instance to be updated
   * @returns updated Hero instance
   */
  private put(hero: Hero) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put<Hero>(this.baseUrl+'/'+hero.id, hero).pipe(catchError(this.handleError));
  }

  /**
   * Handle server errors
   * @param res The HttpErrorResponse from the server
   * @returns Observable error throw
   */
   private handleError(res: HttpErrorResponse | any) {
    console.error(res);
    return observableThrowError(res.error || 'Server error');
  }
}
