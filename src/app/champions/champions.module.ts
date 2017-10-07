import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { ChampListComponent } from 'app/champions/champ-list/champ-list.component';
import { ChampInfoComponent } from 'app/champions/champ-info/champ-info.component';
import { routing } from 'app/champions/champions.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ChampListComponent, ChampInfoComponent]
})
export class ChampionsModule { }
