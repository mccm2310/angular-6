import { Component, OnInit } from '@angular/core';

import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  destinos: string[];
  constructor() {
  	this.destinos = [
    new DestinoViaje('Barcelona', 'https://placeimg.com/380/230/nature', 'España', 'Deseo1'),
    new DestinoViaje('Buenos Aires', 'https://placeimg.com/380/230/arch', 'Argentina', 'Deseo2'),
    new DestinoViaje('Lima', 'https://placeimg.com/380/230/people', 'Perù', 'Deseo3'),
    new DestinoViaje('Barranquilla', 'https://placeimg.com/380/230/animals', 'Colombia', 'Deseo4'),];  	
  }

  ngOnInit() {
  }

  guardar(n:string, u:string, c:string, d:string): boolean { 
    if (!n) 
      return; 
    if (!u)
      u = 'https://placeimg.com/380/230/people';

    this.destinos.push(new DestinoViaje(n, u, c, d));
    console.log(this.destinos)
  }

}
