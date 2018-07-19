import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgForageModule } from 'ngforage';


// app imports
import { AppComponent } from './app.component';
import { HelpComponent } from './components/help/help.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

// Routes
import { routing } from 'app/app.routing';
import { CoreModule } from 'app/core/core.module';
import { ChampionsModule } from './champions/champions.module';

// TODO: about component

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    SideMenuComponent
  ],
  imports: [
    // NgbModule.forRoot(),
    NgbModalModule.forRoot(),
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
