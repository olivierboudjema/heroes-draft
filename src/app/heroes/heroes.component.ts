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
    this.bansSuggested.forEach(element => {
      if (element.name === hero.name) {
        element.selectedAlie = true
        this.bansSuggested = this.bansSuggested.filter(hero => hero.selectedAlie !== true);
      }
    });

    if (hero.selectedAlie === false) {
      this.heroesSuggested.push(hero);
      this.bansSuggested.push(hero);
      this.bansSuggested = this.bansSuggested.slice().sort((a: { value: number; }, b: { value: number; }) => b.value - a.value);
    }
  }

  onAdversaireSelected(hero: Hero) {
    this.myEventAdversaireSelected.emit(hero);

    this.heroesSuggested = this.heroesSuggested.filter(hero => hero.selectedAdversaire !== true);
    this.bansSuggested.forEach(element => {
      if (element.name === hero.name) {
        element.selectedAdversaire = true
        this.bansSuggested = this.bansSuggested.filter(hero => hero.selectedAdversaire !== true);
      }
    });
    if (hero.selectedAdversaire === false) {
      this.heroesSuggested.push(hero);
      this.bansSuggested.push(hero);
      this.bansSuggested = this.bansSuggested.slice().sort((a: { value: number; }, b: { value: number; }) => b.value - a.value);
    }
  }

  onAlieBanned(hero: Hero) {

    this.heroesSuggested = this.heroesSuggested.filter(hero => hero.banned !== true);
    this.bansSuggested.forEach(element => {
      if (element.name === hero.name) {
        element.banned = true
        this.bansSuggested = this.bansSuggested.filter(hero => hero.banned !== true);
      }
    });

    if (hero.banned === false) {
      this.heroesSuggested.push(hero);
      this.bansSuggested.push(hero);
      this.bansSuggested = this.bansSuggested.slice().sort((a: { value: number; }, b: { value: number; }) => b.value - a.value);
    }
  }

  onAdversaireBanned(hero: Hero) {

    this.heroesSuggested = this.heroesSuggested.filter(hero => hero.selectedAdversaire !== true);
    this.bansSuggested.forEach(element => {
      if (element.name === hero.name) {
        element.selectedAdversaire = true
        this.bansSuggested = this.bansSuggested.filter(hero => hero.selectedAdversaire !== true);
      }
    });
    if (hero.selectedAdversaire === false) {
      this.heroesSuggested.push(hero);
      this.bansSuggested.push(hero);
      this.bansSuggested = this.bansSuggested.slice().sort((a: { value: number; }, b: { value: number; }) => b.value - a.value);
    }
  }


}
