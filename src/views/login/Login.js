import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

  state = {
    email: '',
    senha: '',
    valido: false
  };

  entrar = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({ valido: true });
  };

  criarConta = () => {
    this.props.history.push('/criar-conta');
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  render() {
    return (
      <Card style={{ margin: 'auto', maxWidth: '450px' }}>
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form noValidate validated={this.state.valido}>
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
              <Form.Control type="password" placeholder="Digite sua senha" required />
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
    )
  }

}

export default withRouter(Login);
