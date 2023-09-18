import { Component, Inject } from '@angular/core';
import { type Hero, HeroesApiService } from '../heroes-api.service';
import { type Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HeroInfoComponent } from '../hero-info/hero-info.component';
import { AuthService, type User } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  heroes: Observable<Hero[]> = this.heroesApiService.getHeroesList();
  user!: User | null;

  constructor (
    @Inject(HeroesApiService) private readonly heroesApiService: HeroesApiService,
    @Inject(MatDialog) private readonly dialog: MatDialog,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(Router) private readonly router: Router
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

  ngOnInit (): void {
    this.user = this.authService.currentUser;
  }

  logout (): void {
    this.authService.logout();
    void this.router.navigate(['auth']);
  }

  search (): void {
    const searchField = document.getElementById('search-field') as HTMLInputElement;
    this.heroes = this.heroesApiService.getHeroesList(searchField.value);
  }
}
