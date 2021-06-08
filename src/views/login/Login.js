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

    this.setState({valido: true});
  };

  onChangeEmail = (e) => {
    this.setState({email: e.target.value});
  };

  render() {
    return (
      <Card style={{ margin: 'auto', maxWidth: '80%' }}>
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form noValidate validated={this.state.valido}>
            <Form.Group as={Row} controlId="fgEmail">
              <Form.Label column sm="2">E-mail</Form.Label>
              <Col sm="10">
                <Form.Control type="email" placeholder="Digite seu e-mail" 
                  onChange={this.onChangeEmail} required/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="fgSenha">
              <Form.Label column sm="2">Senha</Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Digite sua senha" required/>
              </Col>
            </Form.Group>
          </Form>
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
