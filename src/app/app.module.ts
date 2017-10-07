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

// import { Champion } from 'app/classes/champion';

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
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
