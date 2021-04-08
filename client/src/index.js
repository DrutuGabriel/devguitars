import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/styles.css';
import './Resources/css/responsive.css';

import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';

import {Provider} from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware, ReduxThunk)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
