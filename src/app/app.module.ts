import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// app imports
import { AppComponent } from './app.component';
import { HelpComponent } from './components/help/help.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MatrixBarDirective } from './directives/matrix-bar.directive';

// Routes
import { routing } from 'app/app.routing';
import { CoreModule } from 'app/core/core.module';
// import { RuneListComponent } from 'app/components/runes/rune-list/rune-list.component';
// import { MasteryListComponent } from 'app/components/masteries/mastery-list/mastery-list.component';
// import { RuneInfoComponent } from 'app/components/runes/rune-info/rune-info.component';
// import { MasteryInfoComponent } from 'app/components/masteries/mastery-info/mastery-info.component';

// TODO: about component

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    SideMenuComponent,
    MatrixBarDirective,
    // MasteryInfoComponent,
    // MasteryListComponent,
    // RuneInfoComponent,
    // RuneListComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule.forRoot(),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
