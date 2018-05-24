import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgForageModule } from 'ngforage';


// app imports
import { AppComponent } from './app.component';
import { HelpComponent } from './components/help/help.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MatrixBarDirective } from './directives/matrix-bar.directive';

// Routes
import { routing } from 'app/app.routing';
import { CoreModule } from 'app/core/core.module';
import { ChampSelectModalComponent } from 'app/champions/champ-select-modal/champ-select-modal.component';
import { ChampionsModule } from './champions/champions.module';

// TODO: about component

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    SideMenuComponent,
    MatrixBarDirective,
  ],
  imports: [
    NgbModule.forRoot(),
    NgForageModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule.forRoot(),
    ChampionsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []

})
export class AppModule { }
