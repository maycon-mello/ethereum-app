/* istanbul ignore file */
import { store } from '../index';

export function reduceState(state, type, ...args) {
  const namespaces = type.split('/');
  if (store.getters && store.getters[type]) {
    const nsState = namespaces.slice(0, -1).reduce((result, prop) => result[prop], state);
    return store.getters[type](nsState, ...args);
  }

  return namespaces.reduce((result, prop) => result && result[prop], state);
}

export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default null;
