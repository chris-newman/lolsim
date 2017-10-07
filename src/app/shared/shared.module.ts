import { NgModule, ModuleWithProviders } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { DataService } from 'app/shared/data.service';
import { SortService } from 'app/shared/sort.service';
import { MendService } from 'app/shared/mend.service';
import { CommonService } from 'app/shared/common.service';
import { SimService } from 'app/shared/sim.service';

@NgModule({
  // imports: [
  //   CommonModule
  // ],
  // declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [DataService, CommonService, MendService, SimService, SortService]
    };
  }
}
