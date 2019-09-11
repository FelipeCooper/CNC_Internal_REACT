import React from 'react';
import ReactDOM from 'react-dom';
import Registro from './views/pages/Registro';
import Demonstrativo from './views/pages/Demonstrativo';
import AcessoNegado from './views/components/AcessoNegado';
import Mostrar from './views/pages/Mostrar';
import Admin from './views/pages/Admin';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Mostrar} />
            <Route path="/registrar" component={Registro} />
            <Route path="/acessoNegado" component={AcessoNegado} />
            <Route path="/Demonstrativo" component={Demonstrativo} />
            <Route path="/Admin" component={Admin} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
