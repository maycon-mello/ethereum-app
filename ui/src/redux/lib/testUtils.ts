/* istanbul ignore file */
import { spy } from 'sinon';

export function resolveGenerator(gen: IterableIterator<any>) {
  let result: IteratorResult<any> | undefined = undefined;
  do {
    result = gen.next(result && result.value);
    // console.log(result.value);
  } while (!result.done);
}

export function createSagaMock(state: any = {}) {
  return {
    call: (func: any, ...args: any[]) => func(...args),
    select: spy((prop: string | Function) => {
      if (typeof prop === 'function') {
        return prop(state);
      }

      return state[prop];
    }),
    put: spy(),
    rootPut: spy(),
    take: spy(),
    rootTake: spy(),
    rootSelect: spy(),
  }
}