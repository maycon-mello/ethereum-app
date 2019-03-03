/* istanbul ignore file */
export class ReduxModule<T> {
  state: T;
  sagas: any;
  reducers: any;
  getters: any;
  namespaced: boolean = true;

  constructor() {
    let self: any = this;
    this.namespaced = true;
    this.reducers = self['_reducers'];
    this.getters = self['_getters'];
    this.sagas = self['_sagas'];
  }
}

type SagaOptions = {
  debounce: number;
}

export function Saga(sagaName?: string | string[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target['_sagas']){
      target['_sagas'] = {};
    }

    let { value } = descriptor;
    let propKey = sagaName || propertyKey;

    if (!Array.isArray(propKey)) {
      propKey = [propKey];
    }

    propKey.forEach((key) => {
      target['_sagas'][key] = value;
    })
  }
}

export function Debounce(time: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const sagaConfig = descriptor.value['prototype']['_saga_config'] || {};
    sagaConfig.debounce = time;
    descriptor.value['prototype']['_saga_config'] = sagaConfig;
  }
}

export function Reducer() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target['_reducers']){
      target['_reducers'] = {};
    }

    target['_reducers'][propertyKey] = descriptor.value;

  }
}

export function Getter() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target['_getters']){
      target['_getters'] = {};
    }

    target['_getters'][propertyKey] = descriptor.value;
  }
}
