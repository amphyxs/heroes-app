import { Component, Inject } from '@angular/core';
import { type Hero, HeroesApiService } from '../heroes-api.service';
import { type Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  heroes: Observable<Hero[]> = this.heroesApiService.getHeroesList();

  constructor (
    @Inject(HeroesApiService) private readonly heroesApiService: HeroesApiService
  ) { }
}
