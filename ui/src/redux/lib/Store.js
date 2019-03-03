/* istanbul ignore file */
import reduce from 'lodash/reduce';
import { take, fork, call, all, put, select, debounce } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { reduceState } from './utils';

function ns(action, namespaces) {
  return [...namespaces, action].join('/');
}

function combineSagas(sagas) {
  return function* combine() {
    yield all(sagas);
  };
}

function* watchAction(action, fn, namespaces) {
  const namespacedPut = (type, rest) => put({ type: ns(type, namespaces), ...rest });
  const rootPut = (type, rest) => put({ type, ...rest });
  const namespacedTake = type => take(ns(type, namespaces));
  const namespacedSelect = (type, ...args) => {
    if (typeof type === 'string') {
      return select(state => reduceState(state, ns(type, namespaces), ...args));
    }

    return select(state => type(reduceState(state, namespaces.join('/'))));
  }

  const rootSelect = (type, ...args) => select(state => reduceState(state, type, ...args));

  const sideEffects = {
    put: namespacedPut,
    rootPut: rootPut,
    take: namespacedTake,
    rootTake: take,
    call: call,
    select: namespacedSelect,
    rootSelect: rootSelect,
  };

  const actionName = ns(action, namespaces);
  const sagaConfig = fn.prototype._saga_config;

  if (sagaConfig && sagaConfig.debounce) {
    yield debounce(sagaConfig.debounce, actionName, fn, sideEffects);
  } else {
    while (true) {
      const payload = yield take(actionName);
      yield call(fn, sideEffects, payload);
    }
  }
}

class Store {
  constructor(storeOptions, namespaces = []) {
    const {
      state, modules, reducers, sagas, getters, namespaced,
    } = storeOptions;

    if (modules && (state || reducers || sagas)) {
      throw new Error('Store can not have both modules and reducers/sagas');
    }

    this.options = {
      state, modules, reducers, sagas, getters, namespaced, namespaces,
    };

    this.toRedux();
  }

  toRedux() {
    const {
      modules, namespaces,
    } = this.options;

    if (modules) {
      const reducers = {};
      const sagas = [];
      this.getters = {};
      Object.keys(modules).forEach((key) => {
        const moduleStore = new Store(modules[key], [...namespaces, key]);
        reducers[key] = moduleStore.reducer;
        sagas.push(moduleStore.saga);
        this.getters = { ...this.getters, ...moduleStore.getters };
      });

      this.reducer = combineReducers(reducers);
      this.saga = combineSagas(Object.keys(sagas).map(s => fork(sagas[s])));
      this.getters = { ...this.getters, ...this.makeGetters() };
    } else {
      this.reducer = this.makeReducer();
      this.saga = combineSagas(this.makeSaga());
      this.getters = this.makeGetters();
    }
  }

  makeReducer() {
    const {
      state: initialState, reducers, namespaced, namespaces,
    } = this.options;

    return (state = initialState, action) => {
      const key = Object.keys(reducers || {}).find(k => ns(k, namespaced ? namespaces : []) === action.type);
      if (key) {
        return reducers[key](state, action);
      }
      return state === undefined ? null : state;
    };
  }

  makeSaga() {
    const {
      sagas, namespaces, namespaced,
    } = this.options;
    return sagas ? Object.keys(sagas).map(key => fork(watchAction, key, sagas[key], namespaced ? namespaces : [])) : [];
  }

  makeGetters() {
    const {
      getters, namespaces, namespaced,
    } = this.options;

    return reduce(getters, (result, getter, key) => {
      result[ns(key, namespaced ? namespaces : [])] = getter; // eslint-disable-line no-param-reassign
      return result;
    }, {});
  }
}

export default Store;
