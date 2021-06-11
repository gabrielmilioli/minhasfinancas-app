import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class MenuSuperior extends React.Component {

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#inicio">Minhas finanças</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#inicio">Início</Nav.Link>
          <Nav.Link href="#usuarios">Usuários</Nav.Link>
          <Nav.Link href="#lancamentos">Lançamentos</Nav.Link>
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
