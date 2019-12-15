import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import routes from './routes/routes';
import RouteWithSubRoutes from './RouteWithSubRoutes';

function App() {
  return (
    <div>
      <Switch>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </Switch>
    </div>
  );
}

export default App;
