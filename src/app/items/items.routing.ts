import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemListComponent } from 'app/items/item-list/item-list.component';
import { ItemInfoComponent } from 'app/items/item-info/item-info.component';

const routes: Routes = [
  { path: '', component: ItemListComponent },
  { path: ':itemKey', component: ItemInfoComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
