import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChampListComponent } from 'app/champions/champ-list/champ-list.component';
import { ChampInfoComponent } from 'app/champions/champ-info/champ-info.component';

const routes: Routes = [
  { path: '', component: ChampListComponent },
  { path: ':champKey', component: ChampInfoComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
