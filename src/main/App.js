import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Rotas from './Rotas';
import MenuSuperior from '../app/layout/MenuSuperior';
import ProvedorAutenticacao from './ProvedorAutenticacao';

class App extends React.Component {

  render() {
    return (
      <ProvedorAutenticacao>
        <MenuSuperior />
        <Container fluid className="main-container">
          <Rotas />
        </Container>
      </ProvedorAutenticacao>
    )
  }

}

export default App;
