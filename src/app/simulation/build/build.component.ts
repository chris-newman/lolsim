import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChampSelectModalComponent } from '../../champions/champ-select-modal/champ-select-modal.component';
import { HyperlinkingService } from '../../core/hyperlinking.service';
import { Build } from '../../classes/build';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuildComponent implements OnInit {
  build: Build;
  champBgImage: string;

  constructor(private modalService: NgbModal, private hyperlink: HyperlinkingService) { }

  ngOnInit() {
    this.build = new Build();
    this.champBgImage = 'none';
  }

  openChampSelect() {
    this.modalService.open(ChampSelectModalComponent, {
      windowClass: 'champ-select-modal',
      size: 'lg'
    })
    .result
      .then((champ) => {
        this.build.setChampion(champ);
        this.champBgImage = this.hyperlink.makeChampIconSrc(champ.key);
      })
      .catch((err) => {
        console.warn(err);
      });
  }
}
