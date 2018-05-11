import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildComponent } from './build/build.component';

const routes: Routes = [
  { path: '', component: BuildComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
