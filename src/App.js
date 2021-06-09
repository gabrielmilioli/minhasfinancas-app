import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Rotas from './Rotas';
import MenuSuperior from './layout/MenuSuperior';

class App extends React.Component {

  render() {
    return (
      <>
        <MenuSuperior />
        <Container fluid>
          <Rotas />
        </Container>
      </>
    )
  }

}

export default App;
