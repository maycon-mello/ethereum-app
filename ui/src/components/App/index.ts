/* istanbul ignore file */
import App from './App';
import connect from '../../redux/lib/connect';

export default connect(({ dispatch, get, props }: ConnectProps) => ({
  init: () => dispatch('router/injectHistory', props),
  properties: {
    menuCollapsed: get('layout/menuCollapsed'),
    currentPath: get('router/currentPath'),
  },
  methods: {
    toggleMenu: () => dispatch('layout/toggleMenu'),
    onPathChange: (route: string) => dispatch('router/goTo', { route }),
  },
}))(App);
