import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { ContextoAutenticacao } from '../../main/ProvedorAutenticacao';
import StorageUtils from '../utils/StorageUtils';

class MenuSuperior extends React.Component {

  constructor() {
    super();
    this.usuarioLogado = StorageUtils.getUsuario();
  }

  sair = () => {
    this.context.encerrarSessao();
  };

  render() {
    return (
      <Navbar variant="dark" className="primary">
        <Navbar.Brand href="/#/inicio">Minhas finanças</Navbar.Brand>
        {this.usuarioLogado &&
          <>
            <Nav className="mr-auto">
              <Nav.Link href="/#/inicio">Início</Nav.Link>
              <Nav.Link href="/#/usuarios">Usuários</Nav.Link>
              <Nav.Link href="/#/lancamentos">Lançamentos</Nav.Link>
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <a href="/#/login" onClick={this.sair}>Sair</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </>
        }
      </Navbar>
    )
  }

}

MenuSuperior.contextType = ContextoAutenticacao;

export default MenuSuperior;
