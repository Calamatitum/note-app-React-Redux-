import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';

import App from './App';
import noteApp from './reducers/noteApp'


const store = createStore(noteApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<App store={store} />, document.getElementById('root'));