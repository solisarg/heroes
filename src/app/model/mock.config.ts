
import * as data from './heroes.json';
import {Hero} from './dto';
import { HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

let heroes: Hero[] = (data as any).default;

//Simulate list of heros call
const getHeroes = (request:HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: heroes
  }));
};

//Simulate single hero call
const getHeroe = (request: HttpRequest<any>) => {
  const id = parseInt(extractIdPathParamFromUrl(request));
  const heroe = heroes.find(c => c.id === id);
  return of(new HttpResponse({
    status: 200, body: heroe
  }));
};

//simulate add a Hero
const addHeroe = (request: HttpRequest<any>) => {
  const heroe = request.body as Hero;
  //check that name is not in use
  let exist = heroes.filter(item => item.name == heroe.name)[0]
  if(exist) throw(new Error('El nombre ya existe'))
  //generate fake id
  heroe.id = heroes[heroes.length-1].id + 1
  heroes.push(heroe);
  return of(new HttpResponse({
    status: 200, body: heroe
  }));
};

//Simulate edit a Hero
const editHeroe = (request: HttpRequest<any>) => {
  const id = parseInt(extractIdPathParamFromUrl(request));
  const heroeIndex = heroes.findIndex(c => c.id === id);
  const heroe = request.body as Hero;
  heroes[heroeIndex] = heroe;
  return of(new HttpResponse({
    status: 200, body: heroe
  }));
};

//Simulate delete a Hero
const removeHeroe = (request: HttpRequest<any>) => {
  const id = parseInt(extractIdPathParamFromUrl(request));
  heroes = heroes.filter(c => c.id !== id);
  return of(new HttpResponse({
    status: 204
  }));
};

//extract the endpoint
const extractIdPathParamFromUrl = (request: HttpRequest<any>) => {
  const requestUrl = new URL(request.url);
  return requestUrl.pathname.split('/').pop();
};

export const selectHandler = (request: HttpRequest<any>) => {
  const requestUrl = new URL(request.url);
  const getOneRegexp: RegExp = new RegExp(`/heroes/[0-9a-zA-Z]+`);
  switch (request.method) {
    case 'GET':
      const pathname = requestUrl.pathname;
      if (pathname === '/heroes') {
        return getHeroes;
      } else if (getOneRegexp.test(pathname)) {
        return getHeroe;
      } else {
        return null;
      }
    case 'POST':
      return addHeroe;
    case 'PUT':
      return editHeroe;
    case 'DELETE':
      return removeHeroe;
    default:
      return null;
  }
};
