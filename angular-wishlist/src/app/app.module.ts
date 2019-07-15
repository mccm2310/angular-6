import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken, Injectable, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule as NgRxStoreModule, ActionReducerMap, Store  } from '@ngrx/store';
import { EffectsModule  } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import Dexie from 'dexie';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { DestinosApiClient } from './models/destinos-api-client.model';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import { 
  DestinosViajesState, 
  reducerDestinosViajes, 
  initializeDestinosViajesState,
  DestinosViajesEffects, 
  initMyDataAction} from './models/destino-viaje-state.model';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { AuthService } from './services/auth.service';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';
import { DestinoViaje } from './models/destino-viaje.model';
import { from, Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

// app config
export interface AppConfig {
  apiEndpoint: String;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// fin app config

//init routing
export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponentComponent },
  { path: 'mas-info', component: VuelosMasInfoComponentComponent },
  { path: ':id', component: VuelosDetalleComponentComponent },
];

const routes : Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinosComponent },
  { path: 'destino/:id', component: DestinoDetalleComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ UsuarioLogueadoGuard ]
  },
  {
    path: 'vuelos',
    component: VuelosComponentComponent,
    canActivate: [ UsuarioLogueadoGuard ],
    children: childrenRoutesVuelos
  }
];
//fin routing

//REDUX
export interface AppState {
  destinos: DestinosViajesState;
};

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

const reducersInitialState ={
  destinos: initializeDestinosViajesState() 
}
//fin redux

// app init
export function init_app(appLoadService: AppLoadService): () => Promise<any>  {
  return () => appLoadService.intializeDestinosViajesState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) { }
  async intializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new initMyDataAction(response.body));
  }
}

// fin app init

// dexie db
export class Translation {
  constructor(public trs: any, public keysObj: any) {}
}

@Injectable({
  providedIn: 'root'
})
export class MyDatabase extends Dexie {
  destinos: Dexie.Table<DestinoViaje, number>;
  translations: Dexie.Table<Translation, number>;
  constructor () {
      super('MyDatabase');
      this.version(1).stores({
        destinos: '++id, nombre, imagenUrl'
      });
      this.version(2).stores({
        destinos: '++id, nombre, imagenUrl',
        translations: '++id, lang, keysObj'
      });
  }
}

export const db = new MyDatabase();
// fin dexie db

// i18n ini
class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    const promise = db.translations
      .where('lang')
      .equals(lang)
      .toArray()
      .then(results => {
        if (results.length === 0) {
          return this.http
            .get<Translation[]>(APP_CONFIG_VALUE.apiEndpoint + '/api/translation?lang=' + lang)
            .toPromise()
            .then(apiResults => {
              db.translations.bulkAdd(apiResults);
              return apiResults;
            });
        }
        return results;
      }).then((traducciones) => {
        return traducciones[0];
      }).then((traducciones) => {
        var a = {} 
      //  traducciones.keysObj = traducciones.keysObj.map((t) => ({ [t.key]: t.value}));
      var translated = {}
        traducciones.keysObj.forEach(function(data){             
            if(!translated[data.key]){
              translated[data.key] = data.value;
            }
        });
        return [translated];
      });
   return from(promise).pipe(flatMap((elems) => from(elems)));
  }
}

function HttpLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}
// fin i18n

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponentComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState}),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule,
    ReservasModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
      }
    }),
    NgxMapboxGLModule
  ],
  providers: [
    DestinosApiClient,
    AuthService,    
    MyDatabase,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
