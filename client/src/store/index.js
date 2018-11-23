import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import sagas from './sagas/';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(logger, sagaMiddleware);
const store = createStore(reducer, middleware);
sagaMiddleware.run(sagas);

export default store;
