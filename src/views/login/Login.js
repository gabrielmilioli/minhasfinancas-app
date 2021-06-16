import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import StorageUtils from '../../utils/StorageUtils';
import NotificationUtils from '../../utils/NotificationUtils';

class Login extends React.Component {

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  state = {
    email: '',
    senha: '',
    formInvalido: false,
    erroLogin: false,
    msgErroLogin: '',
  };

  entrar = (e) => {
    console.log(Notification.showNotification);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ formInvalido: true });
      return;
    }

    this.setState({ formInvalido: false });

    this.service.autenticar({
      email: this.state.email,
      senha: this.state.senha
    }).then(response => {
      StorageUtils.setUsuario(response.data);
      this.props.history.push('/inicio');
    }).catch(error => {
      NotificationUtils.show('error', error);
      this.setState({ erroLogin: true, msgErroLogin: error.response.data });
    });
  };

  criarConta = () => {
    this.props.history.push('/criar-conta');
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangeSenha = (e) => {
    this.setState({ senha: e.target.value });
  };

  onCloseNotification = () => {
    this.setState({ msgErroLogin: '' });
  };

  render() {
    return (
      <>
        <Card style={{ margin: 'auto', maxWidth: '450px' }}>
          <Card.Header as="h5">Login</Card.Header>
          <Card.Body>
            <Form noValidate validated={this.state.formInvalido}>
              <Form.Group controlId="fgEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" placeholder="Digite seu e-mail"
                  onChange={this.onChangeEmail} required />
                <Form.Control.Feedback type="invalid">
                  Informe um e-mail válido.
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="fgSenha">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha"
                  onChange={this.onChangeSenha} required />
                <Form.Control.Feedback type="invalid">
                  Informe uma senha válida.
              </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Button variant="link" onClick={this.criarConta}>Criar conta</Button>
            <Button variant="primary" className="float-right" onClick={this.entrar}>Entrar</Button>
          </Card.Footer>
        </Card>
      </>
    )
  }

}

export default withRouter(Login);
