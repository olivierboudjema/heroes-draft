import { HeroesService } from './heroes/heroes.service';
import { Component } from '@angular/core';
import { Hero } from './heroes/hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'heroes';

  heroes: any;
  heroes_a_ban: any;
  heroesAlie: Hero[] = [];
  heroesAdversaire: Hero[] = [];
  maps: any;
  mapSelected: string = "not_yet_selected_map";

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.getHeroes();
    this.getMaps();
  }

  myEventAlieSelected(hero: any) {
    if (!this.heroesAlie.includes(hero)) {
      this.heroesAlie.push(hero)
    } else {
      this.heroesAlie.splice(this.heroesAlie.indexOf(hero), 1);
    }
    this.calculerAllHeroesValue(this.mapSelected)
  }

  myEventAdversaireSelected(hero: any) {
    if (!this.heroesAdversaire.includes(hero)) {
      this.heroesAdversaire.push(hero)
    } else {
      this.heroesAdversaire.splice(this.heroesAdversaire.indexOf(hero), 1);
    }
    this.calculerAllHeroesValue(this.mapSelected)
  }

  onMapSelected(map: string) {
    this.mapSelected = map;
    this.calculerAllHeroesValue(map)
  }

  calculerAllHeroesValue(map: string) {
    this.heroes.forEach((hero: Hero) => {
      this.calculerHeroValue(hero, map)
    });
    this.heroes_a_ban.forEach((hero: Hero) => {
      this.BancalculerHeroValue(hero, map)
    });
  }

  calculerHeroValue(hero: Hero, map: string) {
    hero.value = hero.base_value;
    hero.value = hero.value + this.MapPoint(hero, map);
    hero.value = hero.value + this.AliePoint(hero);
    hero.value = hero.value + this.AdversairePoint(hero);
    hero.value = hero.value + this.CheckTeamConditions(hero);
    hero.value = hero.value + this.CheckCacRangedConditions(hero);
  }


  MapPoint(hero: Hero, map: string): number {
    if (hero.map_strong.includes(map)) {
      console.log(`${map} is in the list map_strong for ${hero.name}`);
      return 1
    }
    if (hero.map_weak.includes(map)) {
      console.log(`${map} is in the list map_weak for ${hero.name}`);
      return -1
    } else {
      return 0
    }
  }

  AliePoint(hero: Hero): number {
    let count = 0;
    this.heroesAlie.forEach(hero_alie => {
      if (hero.synergy_with.includes(hero_alie.name)) {
        console.log(hero.synergy_with)
        console.log(`${hero_alie.name} is in the list hero alié for ${hero.name}`);
        count++;
      }
    });
    return count;
  }

  AdversairePoint(hero: Hero): number {
    let count = 0;
    this.heroesAdversaire.forEach(heroesAdversaire => {
      if (hero.counter_by.includes(heroesAdversaire.name)) {
        console.log(hero.counter_by)
        console.log(`${heroesAdversaire.name} is in the list hero adversaire for ${hero.name}`);
        count--;
      }
    });
    return count;
  }

  CheckTeamConditions(hero: Hero): number {
    let tanks = 0;
    let heals = 0;
    let assassins = 0;
    let bruisers = 0;

    this.heroesAlie.forEach(hero_alie => {
      if (hero_alie.role === 'tank') tanks++;
      if (hero_alie.role === 'heal') heals++;
      if (hero_alie.role === 'assassin') assassins++;
      if (hero_alie.role === 'bruiser') bruisers++;
    });

    if (hero.role === 'tank') tanks++;
    if (hero.role === 'heal') heals++;
    if (hero.role === 'assassin') assassins++;
    if (hero.role === 'bruiser') bruisers++;

    if (tanks > 1 && hero.role === "tank") return - (tanks - 1);
    if (heals > 1 && hero.role === "heal") return - (heals - 1);
    if (bruisers > 1 && hero.role === "bruiser") return - (bruisers - 1);
    if (assassins > 3 && hero.role === "assassin") return - (assassins - 3);

    return 0;
  }


  CheckCacRangedConditions(hero: Hero): number {
    let cac = 0;
    let ranged = 0;

    this.heroesAlie.forEach(hero_alie => {
      if (hero_alie.cac_ranged === 'cac') cac++;
      if (hero_alie.cac_ranged === 'ranged') ranged++;
    });

    if (hero.cac_ranged === 'cac') cac++;
    if (hero.cac_ranged === 'ranged') ranged++;

    if (cac > 3 && hero.cac_ranged === "cac") return -(cac - 3);
    if (ranged > 3 && hero.cac_ranged === "ranged") return -(ranged - 3);

    return 0;
  }

  BancalculerHeroValue(hero: Hero, map: string) {
    hero.value = hero.base_value;
    hero.value = hero.value + this.MapPoint(hero, map);
    hero.value = hero.value + this.BanAliePoint(hero);
    hero.value = hero.value + this.BanAdversairePoint(hero);
    hero.value = hero.value + this.BanCheckTeamConditions(hero);
    hero.value = hero.value + this.BanCheckCacRangedConditions(hero);
  }

  BanAliePoint(hero: Hero): number {
    let count = 0;
    this.heroesAdversaire.forEach(hero_alie => {
      if (hero.synergy_with.includes(hero_alie.name)) {
        console.log(hero.synergy_with)
        console.log(`${hero_alie.name} is in the list hero alié for ${hero.name}`);
        count++;
      }
    });
    return count;
  }

  BanAdversairePoint(hero: Hero): number {
    let count = 0;
    this.heroesAlie.forEach(heroesAdversaire => {
      if (hero.counter_by.includes(heroesAdversaire.name)) {
        console.log(hero.counter_by)
        console.log(`${heroesAdversaire.name} is in the list hero adversaire for ${hero.name}`);
        count--;
      }
    });
    return count;
  }

  BanCheckTeamConditions(hero: Hero): number {
    let tanks = 0;
    let heals = 0;
    let assassins = 0;
    let bruisers = 0;

    this.heroesAdversaire.forEach(hero_alie => {
      if (hero_alie.role === 'tank') tanks++;
      if (hero_alie.role === 'heal') heals++;
      if (hero_alie.role === 'assassin') assassins++;
      if (hero_alie.role === 'bruiser') bruisers++;
    });

    if (hero.role === 'tank') tanks++;
    if (hero.role === 'heal') heals++;
    if (hero.role === 'assassin') assassins++;
    if (hero.role === 'bruiser') bruisers++;

    if (tanks > 1 && hero.role === "tank") return - (tanks - 1);
    if (heals > 1 && hero.role === "heal") return - (heals - 1);
    if (bruisers > 1 && hero.role === "bruiser") return - (bruisers - 1);
    if (assassins > 3 && hero.role === "assassin") return - (assassins - 3);

    return 0;
  }

  BanCheckCacRangedConditions(hero: Hero): number {
    let cac = 0;
    let ranged = 0;

    this.heroesAdversaire.forEach(hero_alie => {
      if (hero_alie.cac_ranged === 'cac') cac++;
      if (hero_alie.cac_ranged === 'ranged') ranged++;
    });

    if (hero.cac_ranged === 'cac') cac++;
    if (hero.cac_ranged === 'ranged') ranged++;

    if (cac > 3 && hero.cac_ranged === "cac") return -(cac - 3);
    if (ranged > 3 && hero.cac_ranged === "ranged") return -(ranged - 3);

    return 0;
  }



  private getHeroes() {
    this.heroesService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.heroes_a_ban = JSON.parse(JSON.stringify(heroes))
      console.log(this.heroes)
      console.log(this.heroes_a_ban)
      this.calculerAllHeroesValue(this.mapSelected)
    });
  }

  private getMaps() {
    this.heroesService.getMaps().subscribe(maps => {
      this.maps = maps;
    });
  }

}
