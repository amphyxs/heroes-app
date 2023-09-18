import { Component, Inject } from '@angular/core';
import { type Hero, HeroesApiService } from '../heroes-api.service';
import { map, tap, type Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HeroInfoComponent } from '../hero-info/hero-info.component';
import { AuthService, type User } from '../auth.service';
import { Router } from '@angular/router';
import { type PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  /* Properties for pagination */
  length = this.heroesApiService.heroMaxId;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];
  pageIndex = 0;

  searchTerm?: string;

  heroes!: Observable<Hero[]>;
  user!: User | null;

  constructor (
    @Inject(HeroesApiService) private readonly heroesApiService: HeroesApiService,
    @Inject(MatDialog) private readonly dialog: MatDialog,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(Router) private readonly router: Router
  ) {
    this.refreshHeroesList();
  }

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
    this.searchTerm = searchField.value;
    this.refreshHeroesList();
  }

  handlePageEvent (pageEvent: PageEvent): void {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.refreshHeroesList();
  }

  private refreshHeroesList (): void {
    const firstIndex = this.pageIndex * this.pageSize;
    const lastIndex = (this.pageIndex + 1) * this.pageSize - 1;

    this.heroes = this.heroesApiService.getHeroesList(this.pageSize, this.pageIndex, this.searchTerm)
      .pipe(
        tap((heroes: Hero[]) => { this.length = heroes.length }),
        map((heroes: Hero[]) => heroes.filter((hero, index) => firstIndex <= index && index <= lastIndex))
      );
  }
}
