import React from 'react';
import Add from './Add';
import Price from './Profit';
import Profit from './Profit'
import { Route, Switch } from 'react-router-dom';

const App = () => {

  return (
    <main>
        <Switch>
            <Route path="/" component={Add} exact />
            <Route path="/profit" component={Profit} />
        </Switch>
    </main>
  );
};

export default App;
