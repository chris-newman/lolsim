import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemInfoComponent } from 'app/items/item-info/item-info.component';
import { ItemListComponent } from 'app/items/item-list/item-list.component';
import { routing } from 'app/items/items.routing';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    routing
  ],
  declarations: [ItemListComponent, ItemInfoComponent]
})
export class ItemsModule { }
