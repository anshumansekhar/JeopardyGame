/*
  Jeopardy Game front End React JS app
  a single page mulitplayer application to play jeopardy 
  player create and join rooms
  player answer question
  when game ends score boards is diplayed 
*/

// import React,ReactDOM 
// import app and css file
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


// import provided from react react-redux
import { Provider } from 'react-redux';

// get store from store file
import store from './store';
// render the react app providing store object
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

