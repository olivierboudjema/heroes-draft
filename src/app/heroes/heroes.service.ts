import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getHeroes() {
    return this.http.get('/assets/heroes.json');
  }

  getMaps() {
    return this.http.get('/assets/maps.json');
  }
}
