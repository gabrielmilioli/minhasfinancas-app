import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

class Login extends React.Component {

  state = {
    email: '',
    senha: '',
    valido: false
  };

  handleSubmit = (e) => {
    const form = e.currentTarget;
    console.log(e);
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({ valido: true });
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  render() {
    return (
      <Card style={{ margin: 'auto', maxWidth: '450px' }}>
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form.Row noValidate validated={this.state.valido}>
            <Form.Group as={Col} controlId="fgEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" placeholder="Digite seu e-mail"
                onChange={this.onChangeEmail} required />
              <Form.Control.Feedback type="invalid">
                Informe um e-mail válido.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row noValidate validated={this.state.valido}>
            <Form.Group as={Col} controlId="fgSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Digite sua senha" required />
              <Form.Control.Feedback type="invalid">
                Informe uma senha válida.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={this.handleSubmit}>Entrar</Button>
          <Button variant="link" className="float-right">Criar conta</Button>
        </Card.Footer>
      </Card>
    )
  }

}

export default Login;
