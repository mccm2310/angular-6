import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';


@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
@Output() onItemAdded: EventEmitter<DestinoViaje>;
fg: FormGroup;
minLongitud = 3;
searchResults: string[];

  constructor(fb: FormBuilder) { 
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url:[''],
      country: [''],
      desc:['']
    });
    this.fg.valueChanges.subscribe(
      (form: any) => {
        //console.log('form cambió:', form);
      }
    );
    
    this.fg.controls['nombre'].valueChanges.subscribe(
      (value: string) => {
        //console.log('nombre cambió:', value);
      }
    );
  }

  ngOnInit() {
    const elemNombre = <HTMLInputElement>document.getElementById('nombre');
    var searchResults2= [];
    
    fromEvent(elemNombre, 'input')
    .pipe(
      map((e:KeyboardEvent)=>(e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap( () => ajax('/assets/datos.json'))
    ).subscribe( ajaxResponse => {      
      searchResults2= [];
      
      ajaxResponse.response.forEach(function(option:string) {        
        if((option.toUpperCase()).includes((elemNombre.value).toUpperCase())){
          searchResults2.push(option)
        }        
      });     
      
      this.searchResults = searchResults2;
    });    
  }

  guardar(destino: any):boolean{
    var c = destino.country.value,
      d = destino.desc.value,
      n = destino.nombre.value, 
      u = destino.url.value=='' ? 'https://placeimg.com/380/230/people' : destino.url.value;

    const newD = new DestinoViaje(n, u , c, d);
    this.onItemAdded.emit(newD);
    return false;
  }

  nombreValidator(control: FormControl) : { [s:  string] : boolean} {
    const l = control.value.toString().trim().length;

    if (l > 0 && l < 3){
      return { invalidNumber: true };
    }
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return ( control: FormControl): { [s:string]: boolean } | null => {
      const l = control.value.toString().trim().length;

      if (l > 0 && l < minLong){
        return { minLongNumber: true };
      }
      return null;
    }
  }
}
