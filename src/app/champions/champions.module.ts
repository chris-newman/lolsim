import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'app/core/core.module';
import { ChampListComponent } from 'app/champions/champ-list/champ-list.component';
import { ChampInfoComponent } from 'app/champions/champ-info/champ-info.component';
import { routing } from 'app/champions/champions.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    routing
  ],
  declarations: [ChampListComponent, ChampInfoComponent]
})
export class ChampionsModule { }
