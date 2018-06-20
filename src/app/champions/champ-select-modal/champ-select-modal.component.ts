import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Champion } from '../../classes/champion';

/**
 * Simple modal component that is just a wrapper around champ-list component
 */
@Component({
  selector: 'app-champ-select-modal',
  templateUrl: './champ-select-modal.component.html',
  styleUrls: ['./champ-select-modal.component.scss']
})
export class ChampSelectModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  selectChampion(champ: Champion) {
    console.log('select champ fn');
    console.log(champ);
    this.activeModal.close(champ);
  }

}
