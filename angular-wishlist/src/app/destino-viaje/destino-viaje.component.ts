import { Component, OnInit, Input, Output, HostBinding, EventEmitter } from '@angular/core';

import { DestinoViaje } from '../models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { VoteUpAction, VoteDownAction, ResetVotesAction } from '../models/destino-viaje-state.model';


@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
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
