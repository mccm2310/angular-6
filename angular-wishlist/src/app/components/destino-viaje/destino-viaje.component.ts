import { Component, OnInit, Input, Output, HostBinding, EventEmitter } from '@angular/core';

import { DestinoViaje } from '../../models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { VoteUpAction, VoteDownAction, ResetVotesAction } from '../../models/destino-viaje-state.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css'],
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({
        backgroundColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [
        animate('3s')
      ]),
      transition('estadoFavorito => estadoNoFavorito', [
        animate('1s')
      ]),
    ])
  ]
})

export class DestinoViajeComponent implements OnInit {
	@Input() destino: DestinoViaje;
	@Input('idx') position: number;
	@HostBinding('attr.class') cssClass = 'col-md-6';
	@Output() selectItem: EventEmitter<DestinoViaje>
	@Output() deleteItem: EventEmitter<Number>

  constructor(private store: Store<AppState>) {
  		this.selectItem = new EventEmitter();
  		this.deleteItem = new EventEmitter();
  }

  ngOnInit() {
  }

  ir() {
  	this.selectItem.emit(this.destino);
  }

  eliminar() {
  	this.deleteItem.emit();
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destino));
  }

  voteDown() {  	
    this.store.dispatch(new VoteDownAction(this.destino));
  }

  resetVotes(){
    this.store.dispatch(new ResetVotesAction(this.destino));
  }
}
