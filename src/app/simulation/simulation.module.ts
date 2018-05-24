import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildComponent } from './build/build.component';
import { routing } from './simulation.routing';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ChampionsModule } from '../champions/champions.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    ChampionsModule,
    routing
  ],
  declarations: [BuildComponent]
})
export class SimulationModule { }
