import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import store from './store/';
import Theme from './theme/';

import Home from './views/Home';

const App = () => (
  <Provider store={store}>
    <Theme>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Theme>
  </Provider>
);
export default App;
