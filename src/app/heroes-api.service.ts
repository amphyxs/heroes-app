import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { type Observable, mergeMap, range, scan, filter } from 'rxjs';

export interface HeroImage {
  url: string
};

export interface Hero {
  id: number
  name: string
  powerstats: object
  biography: object
  appearance: object
  work: object
  connections: object
  image: HeroImage
};

@Injectable({
  providedIn: 'root'
})
export class HeroesApiService {
  heroMaxId = 20;
  private readonly apiAccessToken = '122102557466041683'; // TODO: move this to env vars
  private readonly apiUrl = 'http://localhost:4200/api';

  constructor (
    @Inject(HttpClient) private readonly http: HttpClient
  ) { }

  getHeroesList (searchTerm?: string): Observable<Hero[]> {
    return (
      range(1, this.heroMaxId)
        .pipe(
          mergeMap((id: number) => this.getHeroById(id)),
          filter((hero: Hero) => this.checkSearchTerm(hero, searchTerm)),
          scan((heroes: Hero[], hero: Hero, index: number) => [...heroes, hero], [])
        )
    );
  }

  checkSearchTerm (hero: Hero, searchTerm?: string): boolean {
    if (searchTerm === null || searchTerm === undefined || searchTerm === '') {
      return true;
    }

    return hero.name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  getHeroById (heroId: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${this.apiAccessToken}/${heroId}`);
  }
}
