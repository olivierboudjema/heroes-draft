import { Hero } from './../hero';
import { Component, OnInit, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'app-heroes-selected',
  templateUrl: './heroes-selected.component.html',
  styleUrls: ['./heroes-selected.component.css']
})
export class HeroesSelectedComponent implements OnInit {

  @Input() heroesAlie?: Hero[];

  @Input() heroesAdversaire?: Hero[];

  chanceVictoireAlie: number = 0;

  chanceVictoireAdversaire: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.calculChancesVictoire()
  }

  calculChancesVictoire() {
    this.chanceVictoireAlie = 0;
    this.chanceVictoireAdversaire = 0;
    if (this.heroesAlie && this.heroesAdversaire) {
      this.heroesAlie.forEach(hero => {
        this.chanceVictoireAlie += hero.value;
      });
      this.heroesAdversaire.forEach(hero => {
        this.chanceVictoireAdversaire += hero.value;
      });
    }
    this.chanceVictoireAlie = Number((this.chanceVictoireAlie * 100 / (this.chanceVictoireAlie + this.chanceVictoireAdversaire)).toFixed(2));
    this.chanceVictoireAdversaire = 100 - this.chanceVictoireAlie;
  }

  sommePointsVictoire(heroList: any[] | undefined): number {
    if (heroList !== undefined) {
      return heroList.reduce((acc: any, obj: { value: any; }) => acc + obj.value, 0);
    } else return 0
  }


}
