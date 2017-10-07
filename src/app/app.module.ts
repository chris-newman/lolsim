import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// app imports
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HelpComponent } from './components/help/help.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MatrixBarDirective } from './directives/matrix-bar.directive';
import { ChampListComponent } from './components/champions/champ-list/champ-list.component';
import { ChampInfoComponent } from './components/champions/champ-info/champ-info.component';
import { ItemInfoComponent } from './components/items/item-info/item-info.component';
import { ItemListComponent } from './components/items/item-list/item-list.component';
// import { RuneListComponent } from './components/runes/rune-list/rune-list.component';
// import { RuneInfoComponent } from './components/runes/rune-info/rune-info.component';
// import { MasteryListComponent } from './components/masteries/mastery-list/mastery-list.component';
// import { MasteryInfoComponent } from './components/masteries/mastery-info/mastery-info.component';


// Shared Module
// import { DataService } from './services/data.service';
// import { SortService } from './services/sort.service';
// import { MendService } from './services/mend.service';
// import { SimService } from './services/sim.service';
// import { CommonService } from './services/common.service';


import { Champion } from 'app/classes/champion';

// Routes
import { routing } from 'app/app.routing';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HelpComponent,
    SideMenuComponent,
    MatrixBarDirective,
    ChampListComponent,
    ChampInfoComponent,
    ItemInfoComponent,
    ItemListComponent,
    // RuneListComponent,
    // RuneInfoComponent,
    // MasteryListComponent,
    // MasteryInfoComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    routing
    // RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
