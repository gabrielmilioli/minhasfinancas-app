import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import StorageUtils from '../../utils/StorageUtils';
import NotificationUtils from '../../utils/NotificationUtils';

class CriarConta extends React.Component {

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  state = {
    nome: '',
    email: '',
    senha: '',
    senhaRepetida: '',
    valido: false,
    emailInvalido: false,
    senhaInconsistente: false
  };

  criarConta = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      if (this.senha !== this.senhaRepetida) {
        this.setState({ senhaInconsistente: true });
      }
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.setState({ valido: true });

    const usuario = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha
    };

    this.service.salvar(usuario)
      .then(response => {
        StorageUtils.setUsuario(response.data);
        this.props.history.push('/inicio');
      }).catch(error => {
        NotificationUtils.show('error', error);
        this.setState({ valido: false });
      });
  };

  voltar = () => {
    this.props.history.push('/login');
  };

  onChangeNome = (e) => {
    this.setState({ nome: e.target.value });
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
    
    if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      this.setState({ emailInvalido: true });
      return;
    }

    this.setState({ emailInvalido: false });
  };

  onChangeSenha = (e) => {
    this.setState({ senha: e.target.value });
  };

  onChangeSenhaRepetida = (e) => {
    this.setState({ senhaRepetida: e.target.value });
  };

  render() {
    return (
      <Card style={{ margin: 'auto', maxWidth: '450px' }}>
        <Card.Header as="h5">Criar uma conta</Card.Header>
        <Card.Body>
          <Form noValidate validated={this.state.valido}>
            <Form.Group controlId="fgNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Digite seu nome"
                onChange={this.onChangeNome} required />
              <Form.Control.Feedback type="invalid">
                Informe um nome v??lido.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="fgEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="text" placeholder="Digite seu e-mail"
                onChange={this.onChangeEmail} required />
              <Form.Text className="text-muted">
                N??o divulgamos o seu e-mail.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Informe um e-mail v??lido.
              </Form.Control.Feedback>
              {(this.state.emailInvalido && this.state.valido) && 
              <Form.Control.Feedback type="invalid">
                Informe um e-mail v??lido.
              </Form.Control.Feedback>
              }
            </Form.Group>
            <Form.Group controlId="fgSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Digite sua senha"
                onChange={this.onChangeSenha} required />
              <Form.Control.Feedback type="invalid">
                Informe uma senha v??lida.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="fgRepeteSenha">
              <Form.Label>Repita sua senha</Form.Label>
              <Form.Control type="password" placeholder="Digite novamente sua senha"
                onChange={this.onChangeSenhaRepetida} required isInvalid={this.state.senhaInconsistente} />
              <Form.Control.Feedback type="invalid">
                Repita sua senha.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer>
          <Button variant="link" onClick={this.voltar}>Voltar</Button>
          <Button variant="primary" className="float-right" onClick={this.criarConta}>Criar conta</Button>
        </Card.Footer>
      </Card>
    )
  }
}

export default withRouter(CriarConta);
