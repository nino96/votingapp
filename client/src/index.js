import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Router } from "react-router-dom";
import history from './history';

import * as serviceWorker from './serviceWorker';

const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
  }
  
  ReactDOM.render(
      <Router history={history}>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>  
      </Router>,
      document.getElementById("root")
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
