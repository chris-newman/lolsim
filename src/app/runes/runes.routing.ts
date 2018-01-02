import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RuneTreeComponent } from 'app/runes/rune-tree/rune-tree.component';

const routes: Routes = [
  { path: '', component: RuneTreeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
