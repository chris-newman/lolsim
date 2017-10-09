import { NgModule, ModuleWithProviders } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from 'app/core/data.service';
import { SortService } from 'app/core/sort.service';
import { MendService } from 'app/core/mend.service';
import { CommonService } from 'app/core/common.service';
import { SimService } from 'app/core/sim.service';
import { HeaderComponent } from 'app/core/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [DataService, CommonService, MendService, SimService, SortService]
    };
  }
}
