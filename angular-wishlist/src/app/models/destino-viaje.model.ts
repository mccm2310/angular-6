import {v4 as uuid} from 'uuid';

export class DestinoViaje {
	selected:boolean;
	servicios:string[];
	id = uuid();
	constructor(public nombre:string, public imagenUrl:string, public country:string, public desc:string) {
       this.servicios = ['pileta', 'desayuno'];
	}
	setSelected(s:boolean){
	  this.selected = s;
	}
	isSelected(){
	  return this.selected;
    }
}