import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChampSelectModalComponent } from '../../champions/champ-select-modal/champ-select-modal.component';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  openChampSelect() {
    const modalRef = this.modalService.open(ChampSelectModalComponent, {
      windowClass: 'dark-modal',
      size: 'lg'
    });
    // modalRef.componentInstance.card = card;
  }

}
