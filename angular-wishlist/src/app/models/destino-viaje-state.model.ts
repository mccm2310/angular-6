import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.model';

//ESTADO
export interface DestinosViajesState{
    items: DestinoViaje[];
    loading: boolean;
    favorito: DestinoViaje;
}

export const initializeDestinosViajesState = function(){
    return { 
	    items: [],
	    loading: false,
	    favorito: null
    }
}

//ACCIONES
export enum DestinosViajesActionTypes {
	NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
	ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
	ELIMINAR_DESTINO = '[Destinos Viajes] Eliminar',
	VOTE_UP = '[Destinos Viajes] Vote Up',
	VOTE_DOWN = '[Destinos Viajes] Vote Down',
	RESET_VOTES = '[Destinos Viajes] Reset Votes',
	INIT_MY_DATA = '[Destinos Viajes] Init My Data'
}

export class NuevoDestinoAction implements Action {
  type = DestinosViajesActionTypes.NUEVO_DESTINO;
  constructor(public destino: DestinoViaje) {}
}

export class ElegidoFavoritoAction implements Action {
  type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
  constructor(public destino: DestinoViaje) {}
}

export class EliminarDestinoAction implements Action {
  type = DestinosViajesActionTypes.ELIMINAR_DESTINO;
  constructor(public idx: number) {}
}

export class VoteUpAction implements Action {
  type = DestinosViajesActionTypes.VOTE_UP;
  constructor(public destino: DestinoViaje) {}
}

export class VoteDownAction implements Action {
  type = DestinosViajesActionTypes.VOTE_DOWN;
  constructor(public destino: DestinoViaje) {}
}

export class ResetVotesAction implements Action {
  type = DestinosViajesActionTypes.RESET_VOTES;
  constructor(public destino: DestinoViaje) {}
}

export class initMyDataAction implements Action {
	type = DestinosViajesActionTypes.INIT_MY_DATA;
	constructor(public destinos: string[]) {}
  }

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | EliminarDestinoAction | 
						VoteUpAction | VoteDownAction | ResetVotesAction | initMyDataAction;

//REDUCERS
export function reducerDestinosViajes(
	state:DestinosViajesState,
	action:DestinosViajesActions
) : DestinosViajesState {
	switch (action.type) {
		case DestinosViajesActionTypes.INIT_MY_DATA: {
			const destinos: string[] = (action as initMyDataAction).destinos;
			return {
				...state,
				items: destinos.map((d) => new DestinoViaje(d.nombre, d.imagenUrl, d.country, d.desc, d.votes))
			};
		}
		case DestinosViajesActionTypes.NUEVO_DESTINO: {
		  return {
		  		...state,
		  		items: [...state.items, (action as NuevoDestinoAction).destino ]
		  	};
		}
		case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
		    state.items.forEach(x => x.setSelected(false));
		    let fav:DestinoViaje = (action as ElegidoFavoritoAction).destino;
		    fav.setSelected(true);
		    return {
		    	...state,
		  		favorito: fav
		    };
		}
		case DestinosViajesActionTypes.ELIMINAR_DESTINO: {	
				let idx: number = (action as EliminarDestinoAction).idx;
				state.items.splice(idx, 1);
				return {
						...state
		  	};
		}
		case DestinosViajesActionTypes.VOTE_UP: {	
				let d:DestinoViaje = (action as VoteUpAction).destino;
				d.voteUp();
		    return {
		    	...state
		    };
		}
		case DestinosViajesActionTypes.VOTE_DOWN: {	
			let d:DestinoViaje = (action as VoteUpAction).destino;
				d.voteDown();
		    return {
		    	...state
		    };
		}
		case DestinosViajesActionTypes.RESET_VOTES: {	
			let d:DestinoViaje = (action as ResetVotesAction).destino;
				d.resetVotes();
		    return {
		    	...state
		    };
		}
	}
	return state;
}

//EFFECTS
@Injectable()
export class DestinosViajesEffects {
  @Effect()
  nuevoAgregado$: Observable<Action> = this.actions$.pipe(
    ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
  	map((action:NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
  );

  constructor(private actions$: Actions) {}
}