import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login/index';
import Register from './pages/Register/index';
import Profile from './pages/Profile/index';
import NewIncident from './pages/NewIncident/index';
import Detail from './pages/Details/index';

export default function Routes(props){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile}  />
                <Route path="/incidents/new" component={NewIncident} />
                <Route exact path="/incidents/:id" component={Detail} />
            </Switch>
        </BrowserRouter>
    );
}

