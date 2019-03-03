/* istanbul ignore file */
import { createStore, compose, applyMiddleware } from 'redux';
import makeMiddleware, { runSagas } from './middleware';
import connect from './lib/connect';
import Store from './lib/Store';
import storeOptions from './store';

const store = new Store(storeOptions);

export const getInitialState = () => ({});

let reduxStore;

const makeStore = (state = getInitialState()) => {
  reduxStore = createStore(
    store.reducer,
    state,
    compose(
      applyMiddleware(...makeMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  runSagas(store.saga);

  if (module.hot) {
    module.hot.accept('./store', () => {
      const nextStore = require('./store').default; // eslint-disable-line global-require
      reduxStore.replaceReducer(new Store(nextStore).reducer);
    });
  }

  return reduxStore;
};

const getStore = () => reduxStore;

export { store, connect, getStore };
export default makeStore;
