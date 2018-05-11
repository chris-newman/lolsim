import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'build', pathMatch: 'full'},
  {path: 'build', loadChildren: 'app/simulation/simulation.module#SimulationModule'},
  {path: 'champions', loadChildren: 'app/champions/champions.module#ChampionsModule'},
  {path: 'items', loadChildren: 'app/items/items.module#ItemsModule'},
  {path: 'runes', loadChildren: 'app/runes/runes.module#RunesModule'},
  {path: '**', redirectTo: 'champions'}
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
