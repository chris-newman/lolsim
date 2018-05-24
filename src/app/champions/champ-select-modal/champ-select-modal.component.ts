import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Simple modal component that is just a wrapper around champ-list component
 */
@Component({
  selector: 'app-champ-select-modal',
  templateUrl: './champ-select-modal.component.html',
  styleUrls: ['./champ-select-modal.component.scss']
})
export class ChampSelectModalComponent implements OnInit {

  constructor(activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

}
