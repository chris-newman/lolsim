import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildComponent } from './build/build.component';
import { routing } from './simulation.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [BuildComponent]
})
export class SimulationModule { }
