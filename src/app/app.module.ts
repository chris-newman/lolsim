import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// app imports
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HelpComponent } from './components/help/help.component';
import { MasteriesComponent } from './components/masteries/masteries.component';
import { ChampionsComponent } from './components/champions/champions.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RunesComponent } from './components/runes/runes.component';
import { MatrixBarDirective } from './directives/matrix-bar.directive';
import { ChampListComponent } from './components/champions/champ-list/champ-list.component';
import { ChampInfoComponent } from './components/champions/champ-info/champ-info.component';
import { ItemInfoComponent } from './components/items/item-info/item-info.component';
import { ItemListComponent } from './components/items/item-list/item-list.component';
import { RuneListComponent } from './components/runes/rune-list/rune-list.component';
import { RuneInfoComponent } from './components/runes/rune-info/rune-info.component';
import { MasteryListComponent } from './components/masteries/mastery-list/mastery-list.component';
import { MasteryInfoComponent } from './components/masteries/mastery-info/mastery-info.component';
import { ItemsComponent } from './components/items/items.component';
import { DataService } from './services/data.service';
import { SortService } from './services/sort.service';
import { Champion } from 'app/classes/champion';

// @Injectable()
// class ChampResolver implements Resolve<Champion> {
//   constructor(private backend: DataService) {}
//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): any {
//     console.log('RESOLVER: calling get champ by key from resolver?');
//     return this.backend.getChampionByKey(route.params.champKey);
//   }
// }

//Routes
const routes: Routes = [
  {path: '', redirectTo: 'champions', pathMatch: 'full'},
  {path: 'champions', component: ChampListComponent},
  {path: 'champions/:champKey', component: ChampInfoComponent},
  {path: 'masteries', component: MasteriesComponent},
  {path: 'runes', component: RunesComponent},
  {path: 'items', component: ItemsComponent},
  // {path: 'help', component: HelpComponent}
  {path: '**', redirectTo: 'champions'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HelpComponent,
    MasteriesComponent,
    ChampionsComponent,
    SideMenuComponent,
    RunesComponent,
    MatrixBarDirective,
    ChampListComponent,
    ChampInfoComponent,
    ItemInfoComponent,
    ItemListComponent,
    RuneListComponent,
    RuneInfoComponent,
    MasteryListComponent,
    MasteryInfoComponent,
    ItemsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [DataService, SortService],
  bootstrap: [AppComponent]
})
export class AppModule { }
