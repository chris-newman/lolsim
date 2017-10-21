import { NgModule, ModuleWithProviders } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from 'app/core/data.service';
import { SortService } from 'app/core/sort.service';
import { MendService } from 'app/core/mend.service';
import { HyperlinkingService } from 'app/core/hyperlinking.service';
import { SimService } from 'app/core/sim.service';
import { HeaderComponent } from 'app/core/header/header.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HeaderComponent, AboutComponent],
  exports: [HeaderComponent]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [DataService, HyperlinkingService, MendService, SimService, SortService]
    };
  }
}
