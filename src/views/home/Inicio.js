import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Inicio extends React.Component {

  state = {
    saldo: 0
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
        <h1>Bem-vindo!</h1>
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
