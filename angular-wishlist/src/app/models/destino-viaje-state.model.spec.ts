import {
    reducerDestinosViajes,
    DestinosViajesState,
    initializeDestinosViajesState,
    InitMyDataAction,
    NuevoDestinoAction,
    ElegidoFavoritoAction,
    EliminarDestinoAction,
    VoteUpAction,
    VoteDownAction,
    ResetVotesAction
  } from './destino-viaje-state.model';
  import { DestinoViaje } from './destino-viaje.model';
  
  describe('reducerDestinosViajes', () => {
    it('should reduce init data', () => {
      const prevState: DestinosViajesState = initializeDestinosViajesState();
      const action: InitMyDataAction = new InitMyDataAction([{'nombre': 'destino 1', 'imagenUrl':'', 'country':'', 'desc':'', 'votes':0}]);
      const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
      expect(newState.items.length).toEqual(1);
      expect(newState.items[0].nombre).toEqual('destino 1');
    });
  
    it('should reduce new item added', () => {
      const prevState: DestinosViajesState = initializeDestinosViajesState();
      const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barcelona', '', '', '', 0));
      const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
      expect(newState.items.length).toEqual(1);
      expect(newState.items[0].nombre).toEqual('barcelona');
    });

    it('should reduce a selected item', () => {
      const initState: DestinosViajesState = initializeDestinosViajesState();     
      //Se agrega elemento 
      const prevAction: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('Barcelona Ona', '', '', '', 0));
      const prevState: DestinosViajesState = reducerDestinosViajes(initState, prevAction);
      expect(prevState.items.length).toEqual(1);
      //Se selecciona como favorito ese elemento
      const action: ElegidoFavoritoAction = new ElegidoFavoritoAction(prevState.items[0]);
      const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
      expect(newState.favorito.nombre).toEqual('Barcelona Ona');
    });

    it('should reduce delete a item', () => {
      const initState: DestinosViajesState = initializeDestinosViajesState();     
      //Se agrega elemento 
      const prevAction: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('Barcelona Ona', '', '', '', 0));
      const prevState: DestinosViajesState = reducerDestinosViajes(initState, prevAction);
      expect(prevState.items.length).toEqual(1);
      //Se elimina ese elemento
      const action: EliminarDestinoAction = new EliminarDestinoAction(0);
      const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
      expect(newState.items.length).toEqual(0);
    });

    it('should reduce a vote up on item', () => {
        const initState: DestinosViajesState = initializeDestinosViajesState();     
        //Se agrega elemento 
        const prevAction: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('Barcelona Ona', '', '', '', 0));
        const prevState: DestinosViajesState = reducerDestinosViajes(initState, prevAction);
        expect(prevState.items.length).toEqual(1);
        //Se selecciona como favorito ese elemento
        const action: VoteUpAction = new VoteUpAction(prevState.items[0]);
        const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
        expect(newState.items[0].votes).toEqual(1);
      });

      it('should reduce a vote down on item', () => {
        const initState: DestinosViajesState = initializeDestinosViajesState();     
        //Se agrega elemento 
        const prevAction: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('Barcelona Ona', '', '', '', 0));
        const prevState: DestinosViajesState = reducerDestinosViajes(initState, prevAction);
        expect(prevState.items.length).toEqual(1);
        //Se selecciona como favorito ese elemento
        const action: VoteDownAction = new VoteDownAction(prevState.items[0]);
        const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
        expect(newState.items[0].votes).toEqual(-1);
      });

      it('should reduce reset votes from an item', () => {
        const initState: DestinosViajesState = initializeDestinosViajesState();     
        //Se agrega elemento 
        const prevAction: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('Barcelona Ona', '', '', '', 0));
        const prevState: DestinosViajesState = reducerDestinosViajes(initState, prevAction);
        expect(prevState.items.length).toEqual(1);
        //Se selecciona como favorito ese elemento    
        const action: ResetVotesAction = new ResetVotesAction(prevState.items[0]);
        const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
        expect(newState.items[0].votes).toEqual(0);
      });
  });