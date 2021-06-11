import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import StorageUtils from '../../utils/StorageUtils';

class Inicio extends React.Component {
  
  constructor() {
    super();
    this.service = new UsuarioService();
  }

  state = {
    usuario: StorageUtils.getUsuario(),
    saldo: 0
  };

  componentDidMount() {
    if (!this.state.usuario) {
      return;
    }

    this.service.saldo(this.state.usuario.id)
    .then(response => {
      this.setState({ saldo: Number.parseFloat(response.data).toFixed(2) });
    }).catch(error => {
      console.log(error);
    });
  };

  cadastrarUsuario = () => {
    this.props.history.push('/usuarios/cadastro');
  };

  cadastrarLancamento = () => {
    this.props.history.push('/lancamentos/cadastro');
  };

  render() {
    return (
      <Jumbotron>
        <h1>Bem-vindo, {this.state.usuario.nome}!</h1>
        <p className="lead">Seu saldo para o mês atual é de <strong>R$ {this.state.saldo}</strong></p>
        <hr />
        <p>
          Essa é sua área administrativa, utilize um dos
          menus ou botões abaixo para navegar pelo sistema.
        </p>
        <Button variant="primary" onClick={this.cadastrarUsuario}>Cadastrar um usuário</Button>
        &nbsp;
        <Button variant="primary" onClick={this.cadastrarLancamento}>Cadastrar um lançamento</Button>
      </Jumbotron>
    )
  }

}

export default withRouter(Inicio);
