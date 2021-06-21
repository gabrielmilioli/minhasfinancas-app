import React from 'react';
import StorageUtils from '../app/utils/StorageUtils';

export const ContextoAutenticacao = React.createContext();
export const ConsumidorAutenticacao = ContextoAutenticacao.Consumer;
const Provedor = ContextoAutenticacao.Provider;

class ProvedorAutenticacao extends React.Component {

  state = {
    usuarioAutenticado: StorageUtils.getUsuario(),
    isAutenticado: !!StorageUtils.getUsuario()
  };

  iniciarSessao = (usuario) => {
    StorageUtils.setUsuario(usuario);
    this.setState({ isAutenticado: true, usuarioAutenticado: usuario });
  };

  encerrarSessao = () => {
    StorageUtils.removeUsuario();
    this.setState({ isAutenticado: false, usuarioAutenticado: null });
  };

  render() {
    // divide com os filhos
    const contexto = {
      usuarioAutenticado: this.state.usuarioAutenticado,
      isAutenticado: this.state.isAutenticado,
      iniciarSessao: this.iniciarSessao,
      encerrarSessao: this.encerrarSessao
    };

    return (
      <Provedor value={contexto}>
        {this.props.children}
      </Provedor>
    );
  };
};

export default ProvedorAutenticacao;