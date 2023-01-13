import { SortByPipe } from './sort-by.pipe';
import { SortNamePipe } from './sort-name.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeroDetailsComponent } from './heroes/hero-details/hero-details.component';
import { HeroesSelectedComponent } from './heroes/heroes-selected/heroes-selected.component';
import { FirstLetterUpperCasePipe } from './heroes/first-letter-upper-case.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    SortByPipe,
    SortNamePipe,
    FirstLetterUpperCasePipe,
    HeroDetailsComponent,
    HeroesSelectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
