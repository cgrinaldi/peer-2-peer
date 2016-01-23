import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {syncHistory} from 'redux-simple-router';
import {browserHistory} from 'react-router';
import rootReducer from '../reducers';

const logger = createLogger();

export default function configureStore() {
  const createStoreWithMiddleware =
    applyMiddleware(syncHistory(browserHistory), thunk, logger)(createStore);
  const store = createStoreWithMiddleware(rootReducer);
  return store;
}
