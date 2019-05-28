import {Injectable} from '@angular/core';
import { DestinoViaje } from './destino-viaje.model';
import { tap, last } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store';
import {
		DestinosViajesState,
		NuevoDestinoAction,
		ElegidoFavoritoAction,
		EliminarDestinoAction
	} from './destino-viaje-state.model';
import {AppState} from './../app.module';

@Injectable()
export class DestinosApiClient {
	destinos:DestinoViaje[]=[];

	constructor(private store: Store<AppState>) {
		this.store
			.select(state => state.destinos)
			.subscribe((data) => {
				this.destinos = data.items;
			});
		this.store
			.subscribe((data) => {
			});
	}
	
	add(d:DestinoViaje){
	  this.store.dispatch(new NuevoDestinoAction(d));
	}
	getById(id:String):DestinoViaje{
	  return this.destinos.filter(function(d){return d.id.toString() == id;})[0];
	}
	getAll():DestinoViaje[] {
		return this.destinos;
	}
	elegir(d:DestinoViaje){
	this.store.dispatch(new ElegidoFavoritoAction(d));
	}
	deleteOne(idx:number){
		this.store.dispatch(new EliminarDestinoAction(idx));
	}
}