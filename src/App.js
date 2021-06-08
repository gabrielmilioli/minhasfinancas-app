import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Login from './views/login/Login';

class App extends React.Component {

  render() {
    return (
      <Container fluid>
        <Login />
      </Container>
    )
  }

}

export default App;
