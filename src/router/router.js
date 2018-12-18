import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import App from '@src/app';
import Admin from '@src/admin';

import Home from '@pages/home';
import Ingress from '@pages/ingress';
import Egresses from '@pages/egresses';
import Routes from '@pages/routes';
import Rules from '@pages/rules';

const Router = () => {
  return (
    <BrowserRouter>
      <App>
        <Switch>
          <Route
            path="/"
            render={() => {
              return (
                <Admin>
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/ingress" component={Ingress} />
                    <Route path="/egresses" component={Egresses} />
                    <Route path="/routes" component={Routes} />
                    <Route path="/rules" component={Rules} />
                    <Redirect to="/home" />
                  </Switch>
                </Admin>
              )
            }}
          />
        </Switch>
      </App>
    </BrowserRouter>
  );
};

export default Router;
