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
	@Output() onClicked: EventEmitter<DestinoViaje>

  constructor() {
  		this.onClicked = new EventEmitter();
  }

  ngOnInit() {
  }

  ir() {
  	this.onClicked.emit(this.destino);
  }
}
