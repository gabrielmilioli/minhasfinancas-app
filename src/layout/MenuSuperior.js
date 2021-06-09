import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class MenuSuperior extends React.Component {

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#login">Minhas finanças</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#login">Início</Nav.Link>
          <Nav.Link href="#features">Usuários</Nav.Link>
          <Nav.Link href="#pricing">Lançamentos</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="#login">Sair</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }

}

export default MenuSuperior;
