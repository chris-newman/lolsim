import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChampSelectModalComponent } from '../../champions/champ-select-modal/champ-select-modal.component';
import { HyperlinkingService } from '../../core/hyperlinking.service';
import { Build } from '../../classes/build';
import { SimService } from '../../core/sim.service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuildComponent implements OnInit {
  champBgImage: string;
  // hack for ngFor based on a number
  Arr = Array;

  constructor(private modalService: NgbModal, public hyperlink: HyperlinkingService, public sim: SimService) { }

  ngOnInit() {
    if (this.sim.getBuildChampion()) {
      this.champBgImage = this.hyperlink.makeChampIconSrc(this.sim.getBuildChampion().key);
    } else {
      this.champBgImage = 'none';
    }
  }

  openChampSelect() {
    this.modalService.open(ChampSelectModalComponent, {
      windowClass: 'champ-select-modal',
      size: 'lg'
    })
    .result
      .then((champ) => {
        this.sim.setBuildChampion(champ);
        this.champBgImage = this.hyperlink.makeChampIconSrc(champ.key);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  needPlaceHolderItems() {
    // console.log('called needPlaceholderItems');
    // console.log('returned: ' + (6 - this.sim.itemSet.getItems().length));
    return 6 - this.sim.getBuildItems().length;
  }

  needPlaceHolderMajorRunes() {
    // return 4 - this.sim.get
  }

  needPlaceHolderMinorRunes() {

  }
}
