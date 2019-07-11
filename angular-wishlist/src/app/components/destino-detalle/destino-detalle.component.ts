import { Component, OnInit } from '@angular/core';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [ DestinosApiClient ]
})

export class DestinoDetalleComponent implements OnInit {
  destino:DestinoViaje;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
	  const id = this.route.snapshot.paramMap.get('id');
  }

}