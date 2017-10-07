import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChampListComponent } from 'app/components/champions/champ-list/champ-list.component';
import { ChampInfoComponent } from 'app/components/champions/champ-info/champ-info.component';
import { ItemListComponent } from 'app/components/items/item-list/item-list.component';
import { ItemInfoComponent } from 'app/components/items/item-info/item-info.component';


const routes: Routes = [
  {path: '', redirectTo: 'champions', pathMatch: 'full'},
  {path: 'champions', component: ChampListComponent},
  {path: 'champions/:champKey', component: ChampInfoComponent},
  {path: 'items', component: ItemListComponent},
  {path: 'items/:itemId', component: ItemInfoComponent},
  {path: '**', redirectTo: 'champions'}
];

export const routing = RouterModule.forRoot(routes, {useHash: false});
