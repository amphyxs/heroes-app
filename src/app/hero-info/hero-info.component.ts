import { Component, Inject } from '@angular/core';
import { type Hero } from '../heroes-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface HeroTable extends Hero {
  powerstatsTable: object[]
  biographyTable: object[]
  appearanceTable: object[]
}

@Component({
  selector: 'hero-info-component',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent {
  heroTable: HeroTable = this.convertHeroToTable(this.data);

  constructor (
    @Inject(MatDialogRef<HeroInfoComponent>) private readonly dialogRef: MatDialogRef<HeroInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {}

  convertHeroToTable (hero: Hero): HeroTable {
    const heroTable = hero as HeroTable;
    heroTable.powerstatsTable = this.objectToArray(hero.powerstats);
    heroTable.biographyTable = this.objectToArray(hero.biography);
    heroTable.appearanceTable = this.objectToArray(hero.appearance);
    return heroTable;
  }

  private objectToArray (obj: object): object[] {
    return Object.entries(obj).map(([key, value]) => Object.create({ key, value }))
  }
}
