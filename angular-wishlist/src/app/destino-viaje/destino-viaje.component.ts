import { Component, OnInit, Input, Output, HostBinding, EventEmitter } from '@angular/core';

import { DestinoViaje } from '../models/destino-viaje.model';


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

  constructor() {
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
}
