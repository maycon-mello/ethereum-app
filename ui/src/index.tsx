/* istanbul ignore file */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import "antd/dist/antd.less"; 
// import './antd.less';

import Router from './Router';
import makeStore from './redux';
// import I18n from './core/I18n';


// Configure axios
import './core/axios';

const store = makeStore();

const app = (
  <Provider store={store}>
    <Router />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

