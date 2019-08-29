import React from 'react';
import ReactDOM from 'react-dom';
import Registro from './views/components/Registro';
import AcessoNegado from './views/components/AcessoNegado';
import Mostrar from './views/components/Mostrar'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Mostrar} />
            <Route path="/registrar" component={Registro} />
            <Route path="/acessoNegado" component={AcessoNegado} />
        </Switch>
    </ BrowserRouter>


    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
