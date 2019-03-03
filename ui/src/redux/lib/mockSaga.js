/* istanbul ignore file */
import times from 'lodash/times';

export default function mockSaga(saga, ...args) {
  const returnValues = [];
  const errors = [];

  const rootPut = (type, rest) => ({ type, ...rest });
  const put = (type, rest) => ({ type, ...rest });
  const rootTake = type => ({ type });
  const take = type => ({ type });
  const select = (type, ...rest) => ({ type, ...rest });
  const call = (fn, ...rest) => ({ fn, ...rest });
  const set = (place, returnValue) => {
    returnValues[place + 1] = returnValue;
  };
  const error = (place, errorContent) => {
    errors[place + 1] = errorContent;
  };
  const at = (place) => {
    const gen = saga({
      rootPut, put, rootTake, take, select, call,
    }, ...args);
    const results = times(place + 1, (i) => {
      if (errors[i]) {
        return gen.throw(errors[i]);
      }
      return gen.next(returnValues[i]);
    });
    return results[results.length - 1];
  };

  return {
    error,
    rootPut,
    put,
    rootTake,
    take,
    select,
    call,
    set,
    at,
  };
}
