import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
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

  @Output() myEventAlieSelected = new EventEmitter<Hero>();

  @Output() myEventAdversaireSelected = new EventEmitter<Hero>();
  
  heroesSuggested: Hero[] = []

  ngOnInit(): void { 
  }

  ngOnChanges(): void {
    if (this.heroes) {
    this.heroesSuggested = this.heroes.slice()
    }
  }

  onAlieSelected(hero: Hero) {
    this.myEventAlieSelected.emit(hero);
    this.heroesSuggested = this.heroesSuggested.filter(hero => hero.selectedAlie !== true);
    if (hero.selectedAlie === false) {
      this.heroesSuggested.push(hero);
    }
  }

  onAdversaireSelected(hero: Hero) {
    this.myEventAdversaireSelected.emit(hero);
    this.heroesSuggested = this.heroesSuggested.filter(hero => hero.selectedAdversaire !== true);
    if (hero.selectedAdversaire === false) {
      this.heroesSuggested.push(hero);
    }
  }



}
