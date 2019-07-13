import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { store } from './App';
import { Provider } from 'react-redux';


// ⑦: Redux StoreのProvider設定
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
