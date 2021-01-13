import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MejoraPropuesta } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-mejora',
  templateUrl: './mejora.component.html',
  styleUrls: []
})
export class MejoraComponent implements OnInit {

  @Input() mejora = {
    date: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    titulo: '',
    tag: '',
    descripcion: ''
  };
  newMejora: any;
  @Output() cambioMejora: EventEmitter<MejoraPropuesta> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.newMejora = {
      date: this.mejora.date,
      tag: this.mejora.tag,
      titulo: this.mejora.titulo,
      descripcion: this.mejora.descripcion
    };
  }

  editMejora(mejora: any) {
    this.cambioMejora.emit(mejora);
  }

}
