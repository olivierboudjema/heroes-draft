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
    this.heroes = this.heroes.slice().sort((a: { value: number; }, b: { value: number; }) => b.value - a.value);
    this.heroes_a_ban = this.heroes_a_ban.slice().sort((a: { value: number; }, b: { value: number; }) => b.value - a.value);
  }

  calculerAllHeroesValue(map: string) {
    this.heroes.forEach((hero: Hero) => {
      this.calculerHeroValue(hero, map)
    });
    this.heroes_a_ban.forEach((hero: Hero) => {
      this.BanCalculerHeroValue(hero, map)
    });

  }

  calculerHeroValue(hero: Hero, map: string) {
    hero.value = hero.base_value;
    hero.value = hero.value + this.MapPoint(hero, map);
    hero.value = hero.value + this.AliePoint(hero);
    hero.value = hero.value + this.AdversairePoint(hero);
    hero.value = hero.value + this.CheckTeamConditions(hero);
    hero.value = hero.value + this.CheckCacRangedConditions(hero);
    hero.value = hero.value + this.NeedAtLeastOneTankOneHeal(hero);
    hero.value = hero.value + this.NoMoreThanOneTankOneHeal(hero);
  }


  MapPoint(hero: Hero, map: string): number {
    if (hero.map_strong.includes(map)) {
      return 1
    }
    if (hero.map_weak.includes(map)) {
      return -1
    } else {
      return 0
    }
  }

  AliePoint(hero: Hero): number {
    let count = 0;
    this.heroesAlie.forEach(hero_alie => {
      if (hero.synergy_with.includes(hero_alie.name)) {
        count++;
      }
    });
    return count;
  }

  AdversairePoint(hero: Hero): number {
    let count = 0;
    this.heroesAdversaire.forEach(heroesAdversaire => {
      if (hero.counter_by.includes(heroesAdversaire.name)) {
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

    if (tanks > 2 && hero.role === "tank") return - (tanks - 2);
    if (heals > 2 && hero.role === "heal") return - (heals - 2);
    if (bruisers > 2 && hero.role === "bruiser") return - (bruisers - 2);
    if (bruisers === 1 && tanks === 1) return - (bruisers - 2);
    if (assassins > 4 && hero.role === "assassin") return - (assassins - 6);

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

  NeedAtLeastOneTankOneHeal(hero: Hero): number {
    let tanks = 0;
    let heals = 0;
    let teamSize = 0

    this.heroesAlie.forEach(hero_alie => {
      if (hero_alie.role === 'tank') tanks++;
      if (hero_alie.role === 'heal') heals++;
      teamSize++
    });

    if (hero.role === 'tank') tanks++;
    if (hero.role === 'heal') heals++;

    if (tanks === 0 && teamSize > 3 && hero.role !== "tank") { return -2; }
    if (heals === 0 && teamSize > 3 && hero.role !== "heal") { return -2; }

    return 0;
  }

  NoMoreThanOneTankOneHeal(hero: Hero): number {
    let tanks = 0;
    let heals = 0;

    this.heroesAlie.forEach(hero_alie => {
      if (hero_alie.role === 'tank') tanks++;
      if (hero_alie.role === 'heal') heals++;
    });

    if (tanks > 0 && hero.role === "tank") { return -2; }
    if (heals > 0 && hero.role === "heal") { return -2; }

    return 0;
  }

  BanCalculerHeroValue(hero: Hero, map: string) {
    hero.value = hero.base_value;
    hero.value = hero.value + this.MapPoint(hero, map);
    hero.value = hero.value + this.BanAliePoint(hero);
    hero.value = hero.value + this.BanAdversairePoint(hero);
    hero.value = hero.value + this.BanCheckTeamConditions(hero);
    hero.value = hero.value + this.BanCheckCacRangedConditions(hero);
    hero.value = hero.value + this.BanNeedAtLeastOneTankOneHeal(hero);
  }

  BanAliePoint(hero: Hero): number {
    let count = 0;
    this.heroesAdversaire.forEach(hero_alie => {
      if (hero.synergy_with.includes(hero_alie.name)) {
        count++;
      }
    });
    return count;
  }

  BanAdversairePoint(hero: Hero): number {
    let count = 0;
    this.heroesAlie.forEach(heroesAdversaire => {
      if (hero.counter_by.includes(heroesAdversaire.name)) {
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

    if (tanks > 2 && hero.role === "tank") return - (tanks - 2);
    if (heals > 2 && hero.role === "heal") return - (heals - 2);
    if (bruisers > 2 && hero.role === "bruiser") return - (bruisers - 2);
    if (bruisers === 1 && tanks === 1) return - (bruisers - 2);
    if (assassins > 4 && hero.role === "assassin") return - (assassins - 6);

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

  BanNeedAtLeastOneTankOneHeal(hero: Hero): number {
    let tanks = 0;
    let heals = 0;
    let teamSize = 0

    this.heroesAdversaire.forEach(hero_alie => {
      if (hero_alie.role === 'tank') tanks++;
      if (hero_alie.role === 'heal') heals++;
      teamSize++
    });

    if (hero.role === 'tank') tanks++;
    if (hero.role === 'heal') heals++;



    if (tanks === 0 && teamSize > 3 && hero.role !== "tank") { return -4; }
    if (heals === 0 && teamSize > 3 && hero.role !== "heal") { return -4; }

    return 0;
  }

  private getHeroes() {
    this.heroesService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.heroes_a_ban = JSON.parse(JSON.stringify(heroes))
      this.calculerAllHeroesValue(this.mapSelected)
    });
  }

  private getMaps() {
    this.heroesService.getMaps().subscribe(maps => {
      this.maps = maps;
    });
  }

}
