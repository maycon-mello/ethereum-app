import { Saga, Reducer, Getter, ReduxModule } from '../redux/lib/decorators';

type State = {
  penddingRoute?: string,
  history?: any,
}

export type InjectHistoryAction = {
  history: any,
};

export type GoToAction = {
  route: string,
};

class RouterModule extends ReduxModule<State>{
  state = {
    pendingRoute: undefined,
    history: undefined,
  };

  @Getter()
  currentPath(state: State) {
    return state.history && state.history.location.pathname;
  }

  @Reducer()
  setHistory(state: State, props: any) {
    return {
      history: props.history
    }
  }

  @Reducer()
  setPendingRoute(state: State, props: GoToAction) {
    return {
      ...state,
      pendingRoute: props.route,
    }
  }

  @Saga('injectHistory')
  private * _injectHistory(saga: SideEffects, props: InjectHistoryAction) {
    let history: any = yield saga.select('history');

    if (history) {
      return;
    }
  
    history = props.history;

    const pendingRoute: string = yield saga.select('pendingRoute');

    if (pendingRoute) {
      history.push(pendingRoute);        
      yield saga.put('setPendingRoute', { route: undefined });
    }

    yield saga.put('setHistory', { history });
  }

  @Saga('goTo')
  private * _goTo(saga: SideEffects, props: GoToAction) {
    const history: any = yield saga.select('history');

    if (!history) {
      yield saga.put('setPendingRoute', props);
    } else {
      history.push(props.route);
    }
  }
}

export default RouterModule;
