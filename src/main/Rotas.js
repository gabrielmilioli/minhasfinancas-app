import React from 'react';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import Login from '../app/views/login/Login';
import CriarConta from '../app/views/login/CriarConta';
import Inicio from '../app/views/home/Inicio';
import LancamentoList from '../app/views/lancamento/LancamentoList';
import { ConsumidorAutenticacao } from './ProvedorAutenticacao';

function RotasAutenticadas({ component: Component, isAutenticado, ...props }) {
  return (
    <Route {...props} render={(componentProps) => {
      if (isAutenticado) {
        return (
          <Component {...componentProps} />
        );
      } else {
        return (
          <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
        );
      }
    }} />
  );
}

function Rotas(props) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/criar-conta" component={CriarConta} />

        <RotasAutenticadas isAutenticado={props.isAutenticado} path="/inicio" component={Inicio} />
        <RotasAutenticadas isAutenticado={props.isAutenticado} path="/lancamentos" component={LancamentoList} />
        <RotasAutenticadas isAutenticado={props.isAutenticado} path="/usuarios" component={LancamentoList} />
      </Switch>
    </HashRouter>
  )
}

export default () => (
  <ConsumidorAutenticacao>
    {
      (context) => (
        <Rotas isAutenticado={context.isAutenticado} />
      )
    }
  </ConsumidorAutenticacao>
);