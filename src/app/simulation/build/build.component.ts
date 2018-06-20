import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChampSelectModalComponent } from '../../champions/champ-select-modal/champ-select-modal.component';
import { Champion } from '../../classes/champion';
import { HyperlinkingService } from '../../core/hyperlinking.service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuildComponent implements OnInit {
  build: any;
  champBgImage: string;

  constructor(private modalService: NgbModal, private hyperlink: HyperlinkingService) { }

  ngOnInit() {
    this.build = {};
    this.champBgImage = 'none';
  }

  openChampSelect() {
    this.modalService.open(ChampSelectModalComponent, {
      windowClass: 'champ-select-modal',
      size: 'lg'
    })
    .result
      .then((champ) => {
        this.build.champ = champ;
        this.champBgImage = this.hyperlink.makeChampIconSrc(this.build.champ.key);
      })
      .catch((err) => {
        console.warn(err);
      });
  }
}
