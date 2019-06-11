import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { DestinosViajesState } from '../../models/destino-viaje-state.model';
import { Store } from '@ngrx/store';
import {AppState} from '../../app.module'
import { store } from '@angular/core/src/render3';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  updates: string[];
  lastFavorito: any;
  count: number;
  all;

  constructor(private destinosApiClient:DestinosApiClient, private store: Store<AppState>) {  	
    this.updates = [];
    this.lastFavorito = '';
    this.count= 0
  }

  ngOnInit() {
    this.store.select(state => state.destinos)
      .subscribe(data => {
        if(data.items.length == 0) return;

        let d = data.items[data.items.length-1];
        if(data.items.length > this.count){
          this.updates.push("Se creó: " + d.nombre);
        }
        else if(data.items.length < this.count){
          this.updates.push("Se elimino un destino");
        }
        
        if ( data.favorito != null && (data.favorito != this.lastFavorito)) {
          this.updates.push("Se eligió: " + data.favorito.nombre);
        }
        
        this.lastFavorito = data.favorito;
        this.count = data.items.length;        
      });
      this.store.select(state => state.destinos.items).subscribe(items => this.all = items);
  }

  agregado(d : DestinoViaje) { 
    this.destinosApiClient.add(d);
  }

  elegido(e:DestinoViaje) {    
    this.destinosApiClient.elegir(e);
  }

  eliminado(i : number) { 
    this.destinosApiClient.deleteOne(i);
  }

}
