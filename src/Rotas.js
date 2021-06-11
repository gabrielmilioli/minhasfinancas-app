import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Login from './views/login/Login';
import CriarConta from './views/login/CriarConta';
import Inicio from './views/home/Inicio';

function Rotas() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/inicio" component={Inicio}/>
        <Route path="/login" component={Login}/>
        <Route path="/criar-conta" component={CriarConta}/>
      </Switch>
    </HashRouter>
  )
}

export default Rotas;