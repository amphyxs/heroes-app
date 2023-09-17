import { Component, Inject } from '@angular/core';
import { type Hero, HeroesApiService } from '../heroes-api.service';
import { type Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HeroInfoComponent } from '../hero-info/hero-info.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  heroes: Observable<Hero[]> = this.heroesApiService.getHeroesList();

  constructor (
    @Inject(HeroesApiService) private readonly heroesApiService: HeroesApiService,
    @Inject(MatDialog) private readonly dialog: MatDialog
  ) { }

  openHeroInfoDialog (hero: Hero): void {
    this.dialog.open(HeroInfoComponent, {
      width: '70%',
      height: '90vh',
      enterAnimationDuration: '1',
      exitAnimationDuration: '1',
      data: hero
    });
  }
}
