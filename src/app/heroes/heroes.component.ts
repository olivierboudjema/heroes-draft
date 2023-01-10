import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor() { }

  @Input()
  heroes: Hero[] = [];

  @Input()
  heroes_a_ban: Hero[] = [];

  @Output() myEventAlieSelected = new EventEmitter<Hero>();

  @Output() myEventAdversaireSelected = new EventEmitter<Hero>();

  heroesSuggested: Hero[] = []

  bansSuggested: Hero[] = []

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.heroes) {
      this.heroesSuggested = this.heroes.slice()
      this.bansSuggested = this.heroes_a_ban.slice()
    }
  }

  onAlieSelected(hero: Hero) {
    this.myEventAlieSelected.emit(hero);
    this.heroesSuggested = this.heroesSuggested.filter(hero => hero.selectedAlie !== true);
    this.bansSuggested = this.bansSuggested.filter(hero => hero.selectedAlie !== true);
    if (hero.selectedAlie === false) {
      this.heroesSuggested.push(hero);
      this.bansSuggested.push(hero);
    }
  }

  onAdversaireSelected(hero: Hero) {
    this.myEventAdversaireSelected.emit(hero);
    this.heroesSuggested = this.heroesSuggested.filter(hero => hero.selectedAdversaire !== true);
    this.bansSuggested = this.bansSuggested.filter(hero => hero.selectedAdversaire !== true);
    if (hero.selectedAdversaire === false) {
      this.heroesSuggested.push(hero);
      this.bansSuggested.push(hero);
    }
  }



}
