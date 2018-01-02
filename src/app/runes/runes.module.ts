import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuneTreeComponent } from './rune-tree/rune-tree.component';
import { routing } from 'app/runes/runes.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [RuneTreeComponent]
})
export class RunesModule { }
