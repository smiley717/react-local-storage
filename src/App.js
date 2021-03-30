import React from 'react';
import Add from './Add';
import Price from './Price';
import Profit from './Profit'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {

  return (
    <main>
        <Switch>
            <Route path="/" component={Add} exact />
            <Route path="/price" component={Price} />
            <Route path="/profit" component={Profit} />
        </Switch>
    </main>
  );
};

export default App;
