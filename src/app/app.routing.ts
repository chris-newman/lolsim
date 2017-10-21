import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'champions', pathMatch: 'full'},
  {path: 'champions', loadChildren: 'app/champions/champions.module#ChampionsModule'},
  {path: 'items', loadChildren: 'app/items/items.module#ItemsModule'},
  {path: '**', redirectTo: 'champions'}
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
