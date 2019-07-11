import {Injectable, Inject, forwardRef} from '@angular/core';
import { DestinoViaje } from './destino-viaje.model';
import { tap, last } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
		NuevoDestinoAction,
		ElegidoFavoritoAction,
		EliminarDestinoAction
	} from './destino-viaje-state.model';
import {AppState, APP_CONFIG, AppConfig, MyDatabase, db} from './../app.module';
import {HttpClientModule, HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class DestinosApiClient {
	destinos: DestinoViaje[] = [];

	constructor(
		private store: Store<AppState>,@Inject(forwardRef(()=>APP_CONFIG)) 	private config: AppConfig,
		private http: HttpClient) 
		{
		}
	
	add(d:DestinoViaje){
		const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
		const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', {nuevo: d},{ headers: headers });
		this.http.request(req).subscribe((data: HttpResponse<{}>) => {
			if(data.status === 200) {
				this.store.dispatch(new NuevoDestinoAction(d));
				const myDb = db;
				myDb.destinos.add(d);
				console.log('todos los destinos de la db!');
				myDb.destinos.toArray().then(destinos => console.log(destinos))
			}
		});
	}
	elegir(d:DestinoViaje){
		this.store.dispatch(new ElegidoFavoritoAction(d));
	}
	deleteOne(idx:number){
		this.store.dispatch(new EliminarDestinoAction(idx));
	}

	getById(id: String): DestinoViaje {
		return this.destinos.filter(function(d) { return d.id.toString() === id; })[0];
	}
}