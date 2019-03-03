/* istanbul ignore file */
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const makeMiddleware = () => {
  const middleware = [sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');
    return middleware.concat(createLogger({ collapsed: true }));
  }

  return middleware;
};

export const runSagas = sagas => sagaMiddleware.run(sagas);

export default makeMiddleware();
