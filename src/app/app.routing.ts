import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChampListComponent } from './champions/champ-list/champ-list.component';
import { ChampInfoComponent } from './champions/champ-info/champ-info.component';

const routes: Routes = [
  {path: '', redirectTo: 'build', pathMatch: 'full'},
  // {path: 'champions', loadChildren: 'app/champions/champions.module#ChampionsModule'},
  {path: 'champions', component: ChampListComponent },
  {path: 'champions/:champKey', component: ChampInfoComponent},
  {path: 'items', loadChildren: 'app/items/items.module#ItemsModule'},
  {path: 'runes', loadChildren: 'app/runes/runes.module#RunesModule'},
  {path: 'build', loadChildren: 'app/simulation/simulation.module#SimulationModule'},
  {path: '**', redirectTo: 'champions'}
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
