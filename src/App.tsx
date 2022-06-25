import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row } from 'react-bootstrap';
import Search from './components/Search';

const App:React.FC = () => {
  return (
    <Container>
      <div className="App">
        <h1>Git Commit Search</h1>
        <h4>Search For a Project on Github!</h4>
        <Row>
          <Search />
        </Row>
      </div>
    </Container>
  );
}

export default App;
