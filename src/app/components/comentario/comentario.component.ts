import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Comentario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: []
})
export class ComentarioComponent implements OnInit {

  @Input() comentario = {
    date: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    comentario: ''
  };
  newComentario: any;
  
  @Output() cambioValor: EventEmitter<Comentario> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.newComentario = {
      date: this.comentario.date,
      comentario: this.comentario.comentario
    };
  }

  editComentario(comentario: any) {
    this.cambioValor.emit(comentario);
  }

}
