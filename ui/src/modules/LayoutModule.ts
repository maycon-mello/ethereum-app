import { Reducer, ReduxModule } from '../redux/lib/decorators';

type State = {
  menuCollapsed: boolean,
};

class LayoutModule extends ReduxModule<State> {  
  state = {
    menuCollapsed: false,
  }

  @Reducer()
  toggleMenu(state: State) {
    return {
      ...state,
      menuCollapsed: !state.menuCollapsed,
    };
  }
}

export type InitializeAction = {
};

export default LayoutModule;