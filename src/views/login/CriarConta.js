import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class CriarConta extends React.Component {

  state = {
    nome: '',
    email: '',
    senha: '',
    senhaRepetida: '',
    valido: false,
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
    }

    this.setState({ valido: true });
  };

  voltar = () => {
    this.props.history.push('/login');
  };

  onChangeNome = (e) => {
    this.setState({ nome: e.target.value });
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
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
                Informe um nome válido.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="fgEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="text" placeholder="Digite seu e-mail"
                onChange={this.onChangeEmail} required />
              <Form.Text className="text-muted">
                Não divulgamos o seu e-mail.
              </Form.Text>
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
