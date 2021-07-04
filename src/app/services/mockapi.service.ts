import { Injectable, Component } from '@angular/core';
import { of } from 'rxjs';
import { Hero } from '../model/dto';

@Injectable()
export class MockApiService{
  public getHeroes(){
        return of([
          { "id": 11, "name": "Mr. Nice", "strength":"Fuerza" },
          { "id": 12, "name": "Narco", "strength":"Sorpresa" },
          { "id": 13, "name": "Bombasto", "strength":"Fuerza" },
          { "id": 14, "name": "Celeritas", "strength":"Velocidad" },
          { "id": 15, "name": "Magneta", "strength":"Poder" },
          { "id": 16, "name": "RubberMan", "strength":"Fuerza" },
          { "id": 17, "name": "Dynama", "strength":"Fuerza" },
          { "id": 18, "name": "Dr IQ", "strength":"Inteligencia" },
          { "id": 19, "name": "Magma", "strength":"Fuerza" },
          { "id": 20, "name": "Tornado", "strength":"Fuerza" }
      ]);
  }
  public getHero(id){
      return of({ "id": 11, "name": "Mr. Nice", "strength":"Fuerza" });
  }
  public save(hero:Hero){
    return of(hero);
  }
  public delete(hero: Hero) {
    return of(hero);
  }
}
