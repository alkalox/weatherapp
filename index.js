import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import reducer from './src/reducers'

import React from 'react'

const store = createStore(reducer, applyMiddleware(thunk))

const Main = () => (
  <Provider store={store}> 
    <App /> 
  </Provider>
)

AppRegistry.registerComponent(appName, () => Main );
