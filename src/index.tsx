import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from './TodoApp';

import {BrowserRouter as Router} from "react-router-dom"

import {StoreProvider} from 'easy-peasy'
import store from './store/StoreModel'

import {ThemeProvider} from '@material-ui/core'
import {theme, customTheme, darkTheme} from './theme/materialui_themes'

ReactDOM.render(
  <ThemeProvider theme={theme} > {//choose your teheme 
  }
    <StoreProvider store={store}>
      <React.StrictMode>
        <Router>
          <TodoApp />
        </Router>
      </React.StrictMode>
    </StoreProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
