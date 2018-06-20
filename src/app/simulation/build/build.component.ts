import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChampSelectModalComponent } from '../../champions/champ-select-modal/champ-select-modal.component';
import { Champion } from '../../classes/champion';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuildComponent implements OnInit {
  build: any;
  champBgImage: string;
  show1 = false;
  show2 = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.build = {};
    this.champBgImage = 'none';
  }


  private generateBgImage(champ: Champion): string {
    console.log('generate bg image');
    if (!champ) return 'none';
    else if (champ && champ.key) {
      console.log(champ);
      // return  'url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+champ.key+'_0.jpg")';
      return `url("http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${champ.key}.png")`;
    }
  }

  openChampSelect() {
    const modalRef = this.modalService.open(ChampSelectModalComponent, {
      windowClass: 'champ-select-modal',
      size: 'lg'
    }).result
      .then((champ) => {
        console.log('.then');
        console.log(champ);
        this.build.champ = champ;
        this.champBgImage = this.generateBgImage(this.build.champ);
        console.log(this.champBgImage);
      })
      .catch((err) => {
        console.warn(err);
      });
    // modalRef.componentInstance.card = card;
  }

}
